-- USE [PlanesCoreGDB];
-- GO

IF OBJECT_ID(N'[dbo].[ForUpdatePendientes]', N'TR') IS NOT NULL  
    DROP TRIGGER [dbo].[ForUpdatePendientes]; 
GO

CREATE TRIGGER [dbo].[ForUpdatePendientes]
ON [dbo].[Pendientes]
FOR UPDATE
AS
BEGIN
	DECLARE @ok int;
	SET @ok = 1;

	DECLARE @context varchar(MAX) = CONVERT(
		varchar(MAX),
		(
			SELECT i.OBJECTID, i.ChacraId
			FROM inserted i
			FOR XML AUTO
		)
	);

	/*

		restricciones sobre campos:
			Id,
			ChacraId,
			FechaCreacion,
			FechaModificacion,
			FechaEliminacion

	*/

	IF (UPDATE([OBJECTID]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdatePendientes]',
			@Context = @context,
			@Message = N'El campo "Id" no se puede actualizar.';
	END

	IF (UPDATE([ChacraId]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdatePendientes]',
			@Context = @context,
			@Message = N'El campo "ChacraId" no se puede actualizar.';
	END

	IF (UPDATE([FechaCreado]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdatePendientes]',
			@Context = @context,
			@Message = N'El campo "FechaCreado" se actualiza de forma automatica.';
	END

	IF (UPDATE([FechaModificado]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdatePendientes]',
			@Context = @context,
			@Message = N'El campo "FechaModificado" se actualiza de forma automatica.';
	END

	IF (UPDATE([FechaEliminado]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdatePendientes]',
			@Context = @context,
			@Message = N'El campo "FechaEliminado" se actualiza de forma automatica.';
	END

	/*

		restricciones sobre campos:
			SHAPE

	*/

	IF (UPDATE([SHAPE]))
	BEGIN

		/*

			controlo que las Pendientes a insertar cumplen las condiciones
			con las Chacras asociadas, es decir la chacra asociada debe contener
			la pendiente

		*/
		IF EXISTS (
			SELECT *
			FROM inserted i, [dbo].[Chacras] c
			WHERE
			i.ChacraId = c.Id
			AND
			c.SHAPE.STContains(i.SHAPE) = 0
		)
		BEGIN

			SET @context = CONVERT(
				varchar(MAX),
				(
					SELECT i.OBJECTID, i.ChacraId
					FROM inserted i, [dbo].[Chacras] c
					WHERE
					i.ChacraId = c.Id
					AND
					c.SHAPE.STContains(i.SHAPE) = 0
					FOR XML AUTO
				)
			);

			SET @ok = 0;
			EXEC [dbo].[RaiseRollback]
				@Severity = 16,
				@State = 1,
				@Procedure = N'TRIGGER [dbo].[ForUpdatePendientes]',
				@Context = @context,
				@Message = N'Las Pendientes no estan contenidos en el area de la chacra asociada.';
		END
	END

	/*

		actualizo las pendientes

	*/

	IF @ok <> 0
	BEGIN
		UPDATE [dbo].[Pendientes]
		SET FechaModificado = GETDATE()
		FROM inserted
		WHERE [dbo].[Pendientes].OBJECTID IN (SELECT OBJECTID FROM inserted);
	END
END
