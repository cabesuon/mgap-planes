-- USE [PlanesCoreGDB];
-- GO

IF OBJECT_ID(N'[dbo].[ForUpdateZonasDeExclusion]', N'TR') IS NOT NULL  
    DROP TRIGGER [dbo].[ForUpdateZonasDeExclusion]; 
GO

CREATE TRIGGER [dbo].[ForUpdateZonasDeExclusion]
ON [dbo].[ZonasDeExclusion]
FOR UPDATE
AS
BEGIN
	DECLARE @ok int;
	SET @ok = 1;

	DECLARE @context varchar(MAX) = CONVERT(
		varchar(MAX),
		(
			SELECT i.OBJECTID, i.PlanId
			FROM inserted i
			FOR XML AUTO
		)
	);

	/*

		restricciones sobre campos:
			Id,
			PlanId,
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

	IF (UPDATE([PlanId]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdatePendientes]',
			@Context = @context,
			@Message = N'El campo "PlanId" no se puede actualizar.';
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

		actualizo las ZonasDeExclusion

	*/

	IF @ok <> 0
	BEGIN
		UPDATE [dbo].[ZonasDeExclusion]
		SET FechaModificado = GETDATE()
		FROM inserted
		WHERE [dbo].[ZonasDeExclusion].OBJECTID IN (SELECT OBJECTID FROM inserted);
	END
END
