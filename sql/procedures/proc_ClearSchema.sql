-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[PlanesCore].[ClearSchema]', 'P') > 0
	DROP PROCEDURE [PlanesCore].[ClearSchema];
GO
CREATE PROCEDURE [PlanesCore].[ClearSchema] (
    @Schema VARCHAR(100) = NULL,
	@ErrorMessageOut nvarchar(2000) = NULL OUT
)
AS
BEGIN
	DECLARE @ReturnValue int = 0;
	SET @ErrorMessageOut = '';
    
    BEGIN TRY
        declare @sql varchar(max) = '';
        select @sql += 'drop procedure [' + routine_schema + '].[' + routine_name + '];'
        from information_schema.routines
        where routine_schema = @Schema and routine_type = 'PROCEDURE';
        exec(@sql)
    END TRY
    BEGIN CATCH
        SET @ErrorMessageOut = '[PlanesCore].[ClearSchema] - ERROR: ' + ERROR_MESSAGE();
		SET @ReturnValue = ERROR_NUMBER();
    END CATCH
	RETURN (@ReturnValue);
END
