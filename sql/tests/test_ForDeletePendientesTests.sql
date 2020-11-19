-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ForDeletePendientesTests';
GO

/*
	1 - Existe el trigger ForDeletePendientes
*/
IF OBJECT_ID(N'[ForDeletePendientesTests].[test 1 ForDeletePendientes Existe el trigger]', 'P') > 0
	DROP PROCEDURE [ForDeletePendientesTests].[test 1 ForDeletePendientes Existe el trigger];
GO
CREATE PROCEDURE [ForDeletePendientesTests].[test 1 ForDeletePendientes Existe el trigger]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[ForDeletePendientes]';
END
GO

/*
	2 - Eliminar pendiente asociada a chacra en estado E
*/
IF OBJECT_ID(N'[ForDeletePendientesTests].[test 2 ForDeletePendientes Eliminar pendiente asociada a chacra en estado E]', 'P') > 0
	DROP PROCEDURE [ForDeletePendientesTests].[test 2 ForDeletePendientes Eliminar pendiente asociada a chacra en estado E];
GO
CREATE PROCEDURE [ForDeletePendientesTests].[test 2 ForDeletePendientes Eliminar pendiente asociada a chacra en estado E]
AS
BEGIN
	DECLARE @idChacra int;
  DECLARE @idPendiente int;
  EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @idChacra OUT,
    @IdPendiente = @idPendiente OUT;
  DELETE FROM [dbo].[Pendientes]
  WHERE OBJECTID = @idPendiente;
	IF EXISTS (SELECT OBJECTID FROM [dbo].[Pendientes] WHERE OBJECTID = @idPendiente)
    EXEC tSQLt.Fail 'La pendiente asociada a la chacra no fue eliminada';
END
GO

/*
	3 - Eliminar pendiente asociada a chacra en estado A
*/
IF OBJECT_ID(N'[ForDeletePendientesTests].[test 3 ForDeletePendientes Eliminar pendiente asociada a chacra en estado A]', 'P') > 0
	DROP PROCEDURE [ForDeletePendientesTests].[test 3 ForDeletePendientes Eliminar pendiente asociada a chacra en estado A];
GO
CREATE PROCEDURE [ForDeletePendientesTests].[test 3 ForDeletePendientes Eliminar pendiente asociada a chacra en estado A]
AS
BEGIN
  EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	DECLARE @idChacra int;
  DECLARE @idPendiente int;
  EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @idChacra OUT,
    @IdPendiente = @idPendiente OUT;
  UPDATE [dbo].[Chacras]
  SET Estado = 'A'
  WHERE Id = @idChacra;
	DELETE FROM [dbo].[Pendientes]
  WHERE OBJECTID = @idPendiente;
	
  DECLARE @expectedMessage char(2000) =
    N'No se pueden eliminar pendientes asociadas a chacras en estado "A".';
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		N'No se pueden eliminar pendientes asociadas a chacras en estado "A".';
END
GO

-- EXEC tSQLt.RunTestClass '[ForDeletePendientesTests]';
-- GO
