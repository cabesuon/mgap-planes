-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[ZonaDeExclusionBuilder]', 'P') > 0
	DROP PROCEDURE [dbo].[ZonaDeExclusionBuilder];
GO
CREATE PROCEDURE [dbo].[ZonaDeExclusionBuilder] (
	@PlanId int = NULL,
	@Geom geometry = NULL,
	@Id int = NULL OUT,
	@ErrorMessageOut nvarchar(2000) = NULL OUT
)
AS
BEGIN
	DECLARE @ReturnValue int = 0;
	SET @ErrorMessageOut = '';
	DECLARE @ObjectId int = [dbo].[GetNextObjectId]('PlanesCore', 'ZonasDeExclusion');
	BEGIN TRY
		INSERT [ZonasDeExclusion] (
			[OBJECTID],
			[PlanId],
			[SHAPE]
		)
		VALUES (
			@ObjectId,
			@PlanId,
			@Geom
		)
		SET @Id = @ObjectId;
	END TRY
	BEGIN CATCH
		SET @ErrorMessageOut = '[dbo].[ZonasDeExclusionBuilder] - ERROR: ' + ERROR_MESSAGE();
		SET @ReturnValue = ERROR_NUMBER();
		EXEC tSQLt.Fail @ErrorMessageOut;
	END CATCH
	RETURN (@ReturnValue);
END;
GO