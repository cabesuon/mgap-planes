-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[AddChacraPendiente]', 'P') > 0
	DROP PROCEDURE [dbo].[AddChacraPendiente];
GO
CREATE PROCEDURE [dbo].[AddChacraPendiente] (
	@Nro int = 0,
	@IdChacra int = NULL OUT,
  	@IdPendiente int = NULL OUT,
	@ErrorMessageOut nvarchar(2000) = NULL OUT
)
AS
BEGIN
  	DECLARE @ReturnValue int = 0;
	SET @ErrorMessageOut = '';
	BEGIN TRY
	SET @IdChacra = [dbo].[GetNextChacraId]();
    DECLARE @geom geometry = [dbo].[GetPolygon](@Nro);
	  EXEC [dbo].[ChacraBuilder]
      @Id = @IdChacra,
      @Nro = @IdChacra,
      @PlanId = @IdChacra,
      @PlanNro = @IdChacra,
      @Geom = @geom;
      SET @geom = [dbo].[GetLineString](@Nro);
      EXEC [dbo].[PendienteBuilder]
      @ChacraId = @IdChacra,
      @Geom = @geom,
      @Id = @IdPendiente OUT;
	  END TRY
	BEGIN CATCH
		SET @ErrorMessageOut = '[dbo].[AddChacraPendiente] - ERROR: ' + ERROR_MESSAGE();
		SET @ReturnValue = ERROR_NUMBER();
		EXEC tSQLt.Fail @ErrorMessageOut;
	END CATCH
	RETURN (@ReturnValue);
END;
GO
