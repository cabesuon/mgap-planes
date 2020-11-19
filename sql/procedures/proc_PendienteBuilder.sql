-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[PendienteBuilder]', 'P') > 0
	DROP PROCEDURE [dbo].[PendienteBuilder];
GO
CREATE PROCEDURE [dbo].[PendienteBuilder] (
	@ChacraId int = NULL,
	@Tipo char(1) = 'C',
	@Geom geometry = NULL,
	@Id int = NULL OUT,
	@ErrorMessageOut nvarchar(2000) = NULL OUT
)
AS
BEGIN
	DECLARE @ReturnValue int = 0;
	SET @ErrorMessageOut = '';
	SET @Tipo = COALESCE(@Tipo, 'C');
	BEGIN TRY
		INSERT [dbo].[Pendientes] (
			[ChacraId],
			[Tipo],
			[SHAPE]
		)
		VALUES (
			@ChacraId,
			@Tipo,
			@Geom
		)
		SET @Id = SCOPE_IDENTITY();
	END TRY
	BEGIN CATCH
		SET @ErrorMessageOut = '[dbo].[PendienteBuilder] - ERROR: ' + ERROR_MESSAGE();
		SET @ReturnValue = ERROR_NUMBER();
		EXEC tSQLt.Fail @ErrorMessageOut;
	END CATCH
	RETURN (@ReturnValue);
END;
GO
