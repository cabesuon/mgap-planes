-- USE PlanesCoreGDB;

IF OBJECT_ID(N'[dbo].[ForDeletePendientes]', N'TR') IS NOT NULL  
    DROP TRIGGER [dbo].[ForDeletePendientes]; 
GO

CREATE TRIGGER [dbo].[ForDeletePendientes]
ON [dbo].[Pendientes]
FOR DELETE
AS
BEGIN
	/*

		No se pueden eliminar pendientes asociadas a chacras en estado 'A'

	*/
	IF EXISTS (
		SELECT *
		FROM deleted d INNER JOIN [dbo].[Chacras] c ON d.ChacraId = c.Id
		WHERE c.Estado = 'A'
	)
	BEGIN
		DECLARE @context varchar(MAX) = CONVERT(
			varchar(MAX),
			(
				SELECT d.OBJECTID, d.ChacraId, c.Estado
				FROM deleted d INNER JOIN [dbo].[Chacras] c ON d.ChacraId = c.Id
				FOR XML AUTO
			)
		);

		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForDeletePendientes]',
			@Context = @context,
			@Message = N'No se pueden eliminar pendientes asociadas a chacras en estado "A".';
	END
END;
