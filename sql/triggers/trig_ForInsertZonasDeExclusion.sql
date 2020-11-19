-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[ForInsertZonasDeExclusion]', N'TR') IS NOT NULL  
    DROP TRIGGER [dbo].[ForInsertZonasDeExclusion]; 
GO

CREATE TRIGGER [dbo].[ForInsertZonasDeExclusion]
ON [dbo].[ZonasDeExclusion]
FOR INSERT
AS
BEGIN
	DECLARE @ok int = 1;

	IF @ok <> 0
	BEGIN
		-- deshabilito el trigger de actualizacion
		;DISABLE TRIGGER [dbo].[ForUpdateZonasDeExclusion] ON [dbo].[ZonasDeExclusion]
		UPDATE [dbo].[ZonasDeExclusion]
		SET FechaCreado = GETDATE(),
			FechaModificado = GETDATE(),
			FechaEliminado = null
		FROM inserted
		WHERE [dbo].[ZonasDeExclusion].OBJECTID IN (SELECT OBJECTID FROM inserted);
		-- vuelvo habilitar el trigger de actualizacion
		ENABLE TRIGGER [dbo].[ForUpdateZonasDeExclusion] ON [dbo].[ZonasDeExclusion]
	END

END
