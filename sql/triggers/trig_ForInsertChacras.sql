-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[ForInsertChacras]', N'TR') IS NOT NULL  
	DROP TRIGGER [dbo].[ForInsertChacras]; 
GO

CREATE TRIGGER [dbo].[ForInsertChacras]
ON [dbo].[Chacras]
FOR INSERT
AS
BEGIN
	DECLARE @ok int = 1;
	
	/*

		actualizo las pendientes

	*/
	IF @ok <> 0
	BEGIN
		-- deshabilito el trigger de actualizacion
		;DISABLE TRIGGER [dbo].[ForUpdateChacras] ON [dbo].[Chacras]
		-- actualizo el estado y fechas iniciales
		UPDATE [dbo].[Chacras]
		SET Estado = 'E',
			FechaCreado = GETDATE(),
			FechaModificado = GETDATE(),
			FechaEliminado = null
		FROM inserted
		WHERE [dbo].[Chacras].Id IN (SELECT Id FROM inserted);
		-- vuelvo habilitar el trigger de actualizacion
		ENABLE TRIGGER [dbo].[ForUpdateChacras] ON [dbo].[Chacras]
	END
END
