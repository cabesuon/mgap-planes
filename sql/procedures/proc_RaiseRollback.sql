-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[RaiseRollback]', 'P') > 0
	DROP PROCEDURE [dbo].[RaiseRollback];
GO
CREATE PROCEDURE [dbo].[RaiseRollback] (
	@severity int = 10,
  @state int = 1,
  @procedure char(128) = '[dbo].[RaiseRollback]',
  @context varchar(MAX) = 'Rollback and Raise ERROR',
  @message varchar(MAX) = 'Rollback and Raise ERROR'	
)
AS
BEGIN
  -- ************************************************
  -- la siguiente linea esta para:
  -- - garantizar rollback ante un error de planes
  -- - poder hacer log en la tabla PlanesError
  IF(@@TRANCOUNT>0) ROLLBACK TRANSACTION;
  -- es una decision al menos controvertida
  -- eventualmente evaluar y hacerlo de otra forma
  -- ************************************************
  
  EXEC [dbo].[PlanesErrorBuilder]
    @Severity = @severity,
    @State = @state,
    @Procedure = @procedure,
    @Context = @context,
    @Message = @message;
  RAISERROR (@message,@severity,@state);
END
