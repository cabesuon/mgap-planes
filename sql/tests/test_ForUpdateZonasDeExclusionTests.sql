-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ForUpdateZonasDeExclusionTests';
GO

/*
	1 - Existe el trigger ForUpdateZonasDeExclusion
*/
IF OBJECT_ID(N'[ForUpdateZonasDeExclusionTests].[test 1 ForUpdateZonasDeExclusion Existe el trigger]', 'P') > 0
	DROP PROCEDURE [ForUpdateZonasDeExclusionTests].[test 1 ForUpdateZonasDeExclusion Existe el trigger];
GO
CREATE PROCEDURE [ForUpdateZonasDeExclusionTests].[test 1 ForUpdateZonasDeExclusion Existe el trigger]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[ForUpdateZonasDeExclusion]';
END
GO

/*
	2 - No se puede actualizar el campo ChacraId
*/
IF OBJECT_ID(N'[ForUpdateZonasDeExclusionTests].[test 2 ForUpdateZonasDeExclusion No se puede actualizar el campo ChacraId]', 'P') > 0
	DROP PROCEDURE [ForUpdateZonasDeExclusionTests].[test 2 ForUpdateZonasDeExclusion No se puede actualizar el campo ChacraId];
GO
CREATE PROCEDURE [ForUpdateZonasDeExclusionTests].[test 2 ForUpdateZonasDeExclusion No se puede actualizar el campo ChacraId]
AS
BEGIN
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	DECLARE @idZonaDeExclusion int;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @idZonaDeExclusion OUT;
	
	-- Assert
	DECLARE @expectedMessage char(2000) = N'El campo "PlanId" no se puede actualizar.';

	UPDATE [dbo].[ZonasDeExclusion]
	SET PlanId = 2
	WHERE OBJECTID = @idZonaDeExclusion;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo PlanId de la ZonasDeExclusion.';
END
GO

/*
	3 - No se puede actualizar el campo FechaCreado
*/
IF OBJECT_ID(N'[ForUpdateZonasDeExclusionTests].[test 3 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaCreado]', 'P') > 0
	DROP PROCEDURE [ForUpdateZonasDeExclusionTests].[test 3 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaCreado];
GO
CREATE PROCEDURE [ForUpdateZonasDeExclusionTests].[test 3 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaCreado]
AS
BEGIN
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	DECLARE @idZonaDeExclusion int;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @idZonaDeExclusion OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaCreado" se actualiza de forma automatica.';
	
	UPDATE [dbo].[ZonasDeExclusion]
	SET FechaCreado = GETDATE()
	WHERE OBJECTID = @idZonaDeExclusion;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

  EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaCreado de la ZonasDeExclusion.';
END
GO

/*
	4 - No se puede actualizar el campo FechaModificado
*/
IF OBJECT_ID(N'[ForUpdateZonasDeExclusionTests].[test 4 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaModificado]', 'P') > 0
	DROP PROCEDURE [ForUpdateZonasDeExclusionTests].[test 4 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaModificado];
GO
CREATE PROCEDURE [ForUpdateZonasDeExclusionTests].[test 4 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaModificado]
AS
BEGIN
	DECLARE @idZonaDeExclusion int;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @idZonaDeExclusion OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaModificado" se actualiza de forma automatica.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	UPDATE [dbo].[ZonasDeExclusion]
	SET FechaModificado = GETDATE()
	WHERE OBJECTID = @idZonaDeExclusion;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaModificado de la ZonasDeExclusion.';
END
GO

/*
	5 - No se puede actualizar el campo FechaEliminado
*/
IF OBJECT_ID(N'[ForUpdateZonasDeExclusionTests].[test 5 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaEliminado]', 'P') > 0
	DROP PROCEDURE [ForUpdateZonasDeExclusionTests].[test 5 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaEliminado];
GO
CREATE PROCEDURE [ForUpdateZonasDeExclusionTests].[test 5 ForUpdateZonasDeExclusion No se puede actualizar el campo FechaEliminado]
AS
BEGIN
	DECLARE @idZonaDeExclusion int;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @idZonaDeExclusion OUT;
	
	DECLARE @expectedMessage char(2000) = N'El campo "FechaEliminado" se actualiza de forma automatica.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';

	UPDATE [dbo].[ZonasDeExclusion]
	SET FechaEliminado = GETDATE()
	WHERE OBJECTID = @idZonaDeExclusion;
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);

	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		'No se puede actualizar el campo FechaEliminado de la ZonasDeExclusion.';
END
GO

-- EXEC tSQLt.RunTestClass '[ForUpdateZonasDeExclusionTests]';
-- GO
