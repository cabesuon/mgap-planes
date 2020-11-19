-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[ChacraBuilder]', 'P') > 0
	DROP PROCEDURE [dbo].[ChacraBuilder];
GO
CREATE PROCEDURE [dbo].[ChacraBuilder] (
	@Id int = NULL,
	@Nro int = NULL,
	@PlanId int = NULL,
	@PlanNro int = NULL,
	@Geom geometry = NULL,
	@Estado char (1) = NULL,
	@ErrorMessageOut nvarchar(2000) = NULL OUT
)
AS
BEGIN
	DECLARE @ReturnValue int = 0;
	SET @ErrorMessageOut = '';
	SET @Estado = COALESCE(@Estado, 'E');
	DECLARE @ObjectId int = [dbo].[GetNextObjectId]('PlanesCore', 'Chacras');
	BEGIN TRY
		INSERT [dbo].[Chacras] (
			[OBJECTID],
			[Id],
			[Nro],
			[PlanId],
			[PlanNro],
			[Estado],
			[SHAPE]
		)
		VALUES (
			@ObjectId,
			@Id,
			@Nro,
			@PlanId,
			@PlanNro,
			@Estado,
			@Geom
		)
	END TRY
	BEGIN CATCH
		SET @ErrorMessageOut = '[dbo].[ChacraBuilder] - ERROR: ' + ERROR_MESSAGE();
		SET @ReturnValue = ERROR_NUMBER();
		EXEC tSQLt.Fail @ErrorMessageOut;
	END CATCH
	RETURN (@ReturnValue);
END;
GO
