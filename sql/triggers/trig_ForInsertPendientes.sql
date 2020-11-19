-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[ForInsertPendientes]', N'TR') IS NOT NULL  
    DROP TRIGGER [dbo].[ForInsertPendientes]; 
GO

CREATE TRIGGER [dbo].[ForInsertPendientes]
ON [dbo].[Pendientes]
FOR INSERT
AS
BEGIN
	DECLARE @ok int = 1;
	DECLARE @context varchar(MAX);
	/*

		controlo que la chacra asociada contiene a la pendiente

	*/

	IF EXISTS (
		SELECT *
		FROM inserted i INNER JOIN [dbo].[Chacras] c ON i.ChacraId = c.Id
		WHERE c.SHAPE.STContains(i.SHAPE) = 0
	)
	BEGIN
		SET @context = CONVERT(
			varchar(MAX),
			(
				SELECT i.OBJECTID, i.ChacraId, i.SHAPE.STAsText() AS igeom, c.SHAPE.STAsText() AS cgeom
				FROM inserted i INNER JOIN [dbo].[Chacras] c ON i.ChacraId = c.Id
				FOR XML AUTO
			),
			1
		);
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForInsertPendientes]',
			@Context = @context,
			@Message = N'Las Pendientes no estan contenidas en el area de la chacra asociada.';
	END

	/*

		controlo que no haya mas de una pendiente de cada tipo

	*/

	IF EXISTS (
		SELECT *
		FROM inserted i1, inserted i2
		WHERE
		i1.ChacraId = i2.ChacraId
		AND
		i1.Tipo = i2.Tipo
		AND
		i1.OBJECTID <> i2.OBJECTID
	)
	BEGIN
		SET @context = CONVERT(
			varchar(MAX),
			(
				SELECT i.OBJECTID, i.ChacraId, i.Tipo
				FROM inserted i
				FOR XML AUTO
			),
			1
		);
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForInsertPendientes]',
			@Context = @context,
			@Message = N'No pueden existir dos pendiente de igual tipo con la misma chacra asociada.';
	END

	/*

		controlo que no haya mas de una pendiente de cada tipo

	*/

	IF EXISTS (
		SELECT *
		FROM inserted i, [dbo].[Pendientes] p
		WHERE
		i.ChacraId = p.ChacraId
		AND
		i.Tipo = p.Tipo
		AND
		i.OBJECTID <> p.OBJECTID
	)
	BEGIN
		SET @context = CONVERT(
			varchar(MAX),
			(
				SELECT i.OBJECTID, i.ChacraId, i.Tipo
				FROM inserted i
				FOR XML AUTO
			),
			1
		);
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForInsertPendientes]',
			@Context = @context,
			@Message = N'Ya existe pendiente de igual tipo asociada a la chacra asociada.';
	END

	/*

		actualizo las pendientes

	*/
	IF @ok <> 0
	BEGIN
		
		-- deshabilito el trigger de actualizacion
		;DISABLE TRIGGER [dbo].[ForUpdatePendientes] ON [dbo].[Pendientes]
		UPDATE [dbo].[Pendientes]
		SET FechaCreado = GETDATE(),
			FechaModificado = GETDATE(),
			FechaEliminado = null
		FROM inserted
		WHERE [dbo].[Pendientes].OBJECTID IN (SELECT OBJECTID FROM inserted);
		-- vuelvo habilitar el trigger de actualizacion
		ENABLE TRIGGER [dbo].[ForUpdatePendientes] ON [dbo].[Pendientes]
	END
END
