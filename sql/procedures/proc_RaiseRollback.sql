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
  ROLLBACK TRANSACTION;
  EXEC [dbo].[PlanesErrorBuilder]
    @Severity = @severity,
    @State = @state,
    @Procedure = @procedure,
    @Context = @context,
    @Message = @message;
  RAISERROR (@message,@severity,@state);
END
