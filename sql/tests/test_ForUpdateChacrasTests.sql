-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ForUpdateChacrasTests';
GO

/*
	1 - Existe el trigger ForUpdateChacras
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 1 ForUpdateChacras Existe el trigger]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 1 ForUpdateChacras Existe el trigger];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 1 ForUpdateChacras Existe el trigger]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[ForUpdateChacras]';
END
GO

/*
	2 - No se puede actualizar el campo Id
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 2 ForUpdateChacras No se puede actualizar el campo Id]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 2 ForUpdateChacras No se puede actualizar el campo Id];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 2 ForUpdateChacras No se puede actualizar el campo Id]
AS
BEGIN
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	DECLARE @newId int = [dbo].[GetNextChacraId]();
	UPDATE [dbo].[Chacras]
	SET Id = @newId
	WHERE Id = @id;
	declare @actual int = (SELECT Id FROM [dbo].[Chacras]);
	
	DECLARE @expectedMessage char(2000) = N'El campo "Id" no se puede actualizar.';
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);
	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el Id de la chacra.';
END
GO

/*
	3 - No se puede actualizar el campo Nro
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 3 ForUpdateChacras No se puede actualizar el campo Nro]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 3 ForUpdateChacras No se puede actualizar el campo Nro];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 3 ForUpdateChacras No se puede actualizar el campo Nro]
AS
BEGIN
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "Nro" no se puede actualizar.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	DECLARE @newId int = [dbo].[GetNextChacraId]();
	UPDATE [dbo].[Chacras]
	SET Nro = @newId
	WHERE Id = @id;

	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el Nro de la chacra.';
END
GO

/*
	4 - No se puede actualizar el campo PlanId
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 4 ForUpdateChacras No se puede actualizar el campo PlanId]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 4 ForUpdateChacras No se puede actualizar el campo PlanId];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 4 ForUpdateChacras No se puede actualizar el campo PlanId]
AS
BEGIN
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "PlanId" no se puede actualizar.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	DECLARE @newId int = [dbo].[GetNextChacraId]();
	UPDATE [dbo].[Chacras]
	SET PlanId = @newId
	WHERE Id = @id;

	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el PlanId de la chacra.';
END
GO

/*
	5 - No se puede actualizar el campo PlanNro
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 5 ForUpdateChacras No se puede actualizar el campo PlanNro]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 5 ForUpdateChacras No se puede actualizar el campo PlanNro];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 5 ForUpdateChacras No se puede actualizar el campo PlanNro]
AS
BEGIN
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "PlanNro" no se puede actualizar.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	DECLARE @newId int = [dbo].[GetNextChacraId]();
	UPDATE [dbo].[Chacras]
	SET PlanNro = @newId
	WHERE Id = @id;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el PlanNro de la chacra.';
END
GO

/*
	6 - No se puede actualizar el campo FechaCreado
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 6 ForUpdateChacras No se puede actualizar el campo FechaCreado]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 6 ForUpdateChacras No se puede actualizar el campo FechaCreado];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 6 ForUpdateChacras No se puede actualizar el campo FechaCreado]
AS
BEGIN
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaCreado" se actualiza de forma automatica.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	UPDATE [dbo].[Chacras]
	SET FechaCreado = GETDATE()
	WHERE Id = @id;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaCreado de la chacra.';
END
GO

/*
	7 - No se puede actualizar el campo FechaModificado
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 7 ForUpdateChacras No se puede actualizar el campo FechaModificado]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 7 ForUpdateChacras No se puede actualizar el campo FechaModificado];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 7 ForUpdateChacras No se puede actualizar el campo FechaModificado]
AS
BEGIN
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaModificado" se actualiza de forma automatica.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	UPDATE [dbo].[Chacras]
	SET FechaModificado = GETDATE()
	WHERE Id = @id;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaModificado de la chacra.';
END
GO

/*
	8 - No se puede actualizar el campo FechaEliminado
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 8 ForUpdateChacras No se puede actualizar el campo FechaEliminado]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 8 ForUpdateChacras No se puede actualizar el campo FechaEliminado];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 8 ForUpdateChacras No se puede actualizar el campo FechaEliminado]
AS
BEGIN
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaEliminado" se actualiza de forma automatica.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	UPDATE [dbo].[Chacras]
	SET FechaEliminado = GETDATE()
	WHERE Id = @id;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaEliminado de la chacra.';
END
GO

/*
	9 - Actualizacion de campo Estado, sin solapes
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 9 ForUpdateChacras Actualizacion de campo Estado, sin solapes]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 9 ForUpdateChacras Actualizacion de campo Estado, sin solapes];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 9 ForUpdateChacras Actualizacion de campo Estado, sin solapes]
AS
BEGIN
	DECLARE @expected char (1) = 'A';
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @id OUT;
	
	UPDATE [dbo].[Chacras]
	SET Estado = 'A'
	WHERE Id = @id;
	DECLARE @actual char (1) = (SELECT Estado FROM [dbo].[Chacras] WHERE Id = @id);
	EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'El campo Estado no se actualizo a A.';
END
GO

/*
	10 - Actualizacion de campo Estado, con solapes
*/
IF OBJECT_ID(N'[ForUpdateChacrasTests].[test 10 ForUpdateChacras Actualizacion de campo Estado, con solapes]', 'P') > 0
	DROP PROCEDURE [ForUpdateChacrasTests].[test 10 ForUpdateChacras Actualizacion de campo Estado, con solapes];
GO
CREATE PROCEDURE [ForUpdateChacrasTests].[test 10 ForUpdateChacras Actualizacion de campo Estado, con solapes]
AS
BEGIN

	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	-- Chacra 1
	DECLARE @idChacra1 int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @idChacra1 OUT;
	
	UPDATE [dbo].[Chacras]
	SET Estado = 'A'
	WHERE Id = @idChacra1;
	-- Chacra 2
	DECLARE @idChacra2 int;
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @idChacra2 OUT;
	
	UPDATE [dbo].[Chacras]
	SET Estado = 'A'
	WHERE Id = @idChacra2;

	-- Assert
	DECLARE @expectedMessage char(2000) =
	N'Las chacras en estado "A" a insertar se superponen con chacras en estado "A" ya existentes.';
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);
	
	-- PRINT '**************'
	-- PRINT @actualMessage
	-- PRINT '**************'
	
	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo Estado a A por solapes.';
END
GO

-- EXEC tSQLt.RunTestClass '[ForUpdateChacrasTests]';
-- GO
