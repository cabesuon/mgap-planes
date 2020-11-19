-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ForUpdatePendientesTests';
GO

/*
	1 - Existe el trigger ForUpdatePendientes
*/
IF OBJECT_ID(N'[ForUpdatePendientesTests].[test 1 ForUpdatePendientes Existe el trigger]', 'P') > 0
	DROP PROCEDURE [ForUpdatePendientesTests].[test 1 ForUpdatePendientes Existe el trigger];
GO
CREATE PROCEDURE [ForUpdatePendientesTests].[test 1 ForUpdatePendientes Existe el trigger]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[ForUpdatePendientes]';
END
GO

/*
	2 - No se puede actualizar el campo ChacraId
*/
IF OBJECT_ID(N'[ForUpdatePendientesTests].[test 2 ForUpdatePendientes No se puede actualizar el campo ChacraId]', 'P') > 0
	DROP PROCEDURE [ForUpdatePendientesTests].[test 2 ForUpdatePendientes No se puede actualizar el campo ChacraId];
GO
CREATE PROCEDURE [ForUpdatePendientesTests].[test 2 ForUpdatePendientes No se puede actualizar el campo ChacraId]
AS
BEGIN
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	-- Chacra 1
	DECLARE @idPendiente1 int;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @idPendiente1 OUT;
	
	-- Chacra 2
	DECLARE @idChacra2 int;
	DECLARE @idPendiente2 int;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @idChacra2 OUT,
		@IdPendiente = @idPendiente2 OUT;
	UPDATE [dbo].[Pendientes]
	SET Tipo = 'M'
	WHERE OBJECTID = @idPendiente2;

	-- Assert
	DECLARE @expectedMessage char(2000) = N'El campo "ChacraId" no se puede actualizar.';

	UPDATE [dbo].[Pendientes]
	SET ChacraId = @idChacra2
	WHERE OBJECTID = @idPendiente1;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo ChacraId de la pendiente.';
END
GO

/*
	3 - No se puede actualizar el campo FechaCreado
*/
IF OBJECT_ID(N'[ForUpdatePendientesTests].[test 3 ForUpdatePendientes No se puede actualizar el campo FechaCreado]', 'P') > 0
	DROP PROCEDURE [ForUpdatePendientesTests].[test 3 ForUpdatePendientes No se puede actualizar el campo FechaCreado];
GO
CREATE PROCEDURE [ForUpdatePendientesTests].[test 3 ForUpdatePendientes No se puede actualizar el campo FechaCreado]
AS
BEGIN
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	DECLARE @idPendiente int;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @idPendiente OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaCreado" se actualiza de forma automatica.';
	
	UPDATE [dbo].[Pendientes]
	SET FechaCreado = GETDATE()
	WHERE OBJECTID = @idPendiente;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

  EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaCreado de la pendiente.';
END
GO

/*
	4 - No se puede actualizar el campo FechaModificado
*/
IF OBJECT_ID(N'[ForUpdatePendientesTests].[test 4 ForUpdatePendientes No se puede actualizar el campo FechaModificado]', 'P') > 0
	DROP PROCEDURE [ForUpdatePendientesTests].[test 4 ForUpdatePendientes No se puede actualizar el campo FechaModificado];
GO
CREATE PROCEDURE [ForUpdatePendientesTests].[test 4 ForUpdatePendientes No se puede actualizar el campo FechaModificado]
AS
BEGIN
	DECLARE @idPendiente int;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @idPendiente OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaModificado" se actualiza de forma automatica.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	UPDATE [dbo].[Pendientes]
	SET FechaModificado = GETDATE()
	WHERE OBJECTID = @idPendiente;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaModificado de la pendiente.';
END
GO

/*
	5 - No se puede actualizar el campo FechaEliminado
*/
IF OBJECT_ID(N'[ForUpdatePendientesTests].[test 5 ForUpdatePendientes No se puede actualizar el campo FechaEliminado]', 'P') > 0
	DROP PROCEDURE [ForUpdatePendientesTests].[test 5 ForUpdatePendientes No se puede actualizar el campo FechaEliminado];
GO
CREATE PROCEDURE [ForUpdatePendientesTests].[test 5 ForUpdatePendientes No se puede actualizar el campo FechaEliminado]
AS
BEGIN
	DECLARE @idPendiente int;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @idPendiente OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaEliminado" se actualiza de forma automatica.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	UPDATE [dbo].[Pendientes]
	SET FechaEliminado = GETDATE()
	WHERE OBJECTID = @idPendiente;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaEliminado de la pendiente.';
END
GO

/*
	6 - Actualizacion de geometria, no contenida en chacra asociada
*/
IF OBJECT_ID(N'[ForUpdatePendientesTests].[test 6 ForUpdatePendientes Actualizacion de geometria, no contenida en chacra asociada]', 'P') > 0
	DROP PROCEDURE [ForUpdatePendientesTests].[test 6 ForUpdatePendientes Actualizacion de geometria, no contenida en chacra asociada];
GO
CREATE PROCEDURE [ForUpdatePendientesTests].[test 6 ForUpdatePendientes Actualizacion de geometria, no contenida en chacra asociada]
AS
BEGIN
	DECLARE @idPendiente int;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @idPendiente OUT;
	
	DECLARE @expectedMessage char(2000) = N'Las Pendientes no estan contenidos en el area de la chacra asociada.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	DECLARE @newGeom geometry = [dbo].[GetLineString](100);
	UPDATE [dbo].[Pendientes]
	SET SHAPE = @newGeom
	WHERE OBJECTID = @idPendiente;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar la geometria por no estar contenida en la chacra asociada.';
END
GO

-- EXEC tSQLt.RunTestClass '[ForUpdatePendientesTests]';
-- GO
