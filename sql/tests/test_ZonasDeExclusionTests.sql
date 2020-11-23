-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ZonasDeExclusionTablaTests';
GO

/*
	1 - Existe la tabla ZonasDeExclusion
*/
IF OBJECT_ID(N'[ZonasDeExclusionTablaTests].[test ZonasDeExclusion Existe la tabla]', 'P') > 0
	DROP PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion Existe la tabla];
GO
CREATE PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion Existe la tabla]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[ZonasDeExclusion]';
END
GO

/*
	2 - La metadata de la tabla ZonasDeExclusion es correcta
*/
IF OBJECT_ID(N'[ZonasDeExclusionTablaTests].[test 2 ZonasDeExclusion Metadata correcta]', 'P') > 0
	DROP PROCEDURE [ZonasDeExclusionTablaTests].[test 2 ZonasDeExclusion Metadata correcta];
GO
CREATE PROCEDURE [ZonasDeExclusionTablaTests].[test 2 ZonasDeExclusion Metadata correcta]
AS
BEGIN
	IF OBJECT_ID(N'[ZonasDeExclusionTablaTests].[ZonasDeExclusion]') > 0 DROP TABLE [ZonasDeExclusionTablaTests].[ZonasDeExclusion];
	CREATE TABLE [ZonasDeExclusionTablaTests].[ZonasDeExclusion] (
		[PlanId] int NOT NULL,
		[FechaCreado] datetime2(7) NULL,
		[FechaModificado] datetime2(7) NULL,
		[FechaEliminado] datetime2(7) NULL,
		[OBJECTID] int NOT NULL,
		[SHAPE] geometry NOT NULL
	);
	DECLARE @id int = 0;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @id OUT;
	INSERT INTO [ZonasDeExclusionTablaTests].[ZonasDeExclusion]
	SELECT * FROM [dbo].[ZonasDeExclusion];
	EXEC tSQLt.AssertEqualsTableSchema
		'[ZonasDeExclusionTablaTests].[ZonasDeExclusion]',
		'[dbo].[ZonasDeExclusion]';
END
GO

/*
	El campo Id auto incrementa
*/
IF OBJECT_ID(N'[ZonasDeExclusionTablaTests].[test ZonasDeExclusion Id auto incrementa]', 'P') > 0
	DROP PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion Id auto incrementa];
GO
CREATE PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion Id auto incrementa]
AS
BEGIN
	DECLARE @firstId int, @actualId int, @expectedId int;
	BEGIN TRY
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @firstId OUT;
	EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @actualId OUT;
	END TRY
	BEGIN CATCH
		DECLARE @errorMessage nvarchar(1000) = ERROR_MESSAGE();
        IF ERROR_NUMBER() != 515
            RAISERROR(@errorMessage, 16, 1);
	END CATCH
	SET @expectedId = @firstId + 1;
	IF @firstId IS NULL OR @actualId IS NULL
        EXEC tSQLt.Fail 'Id auto incremento no implementado (los valores no se cargan)';
    ELSE
        EXEC tSQLt.AssertEquals
              @expectedId
            , @actualId
            , 'Id auto incremento no implementado (los valores no incrementan como es esperado)';
END
GO


/*
	El campo Id de la tabla ZonasDeExclusion es unico
*/
IF OBJECT_ID(N'[ZonasDeExclusionTablaTests].[test ZonasDeExclusion Id es unico]', 'P') > 0
	DROP PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion Id es unico];
GO
CREATE PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion Id es unico]
AS
BEGIN
	DECLARE @expectedError int = 2627;
	DECLARE @actualError int = 0;
	DECLARE @id int = COALESCE((SELECT MAX(OBJECTID) FROM [dbo].[ZonasDeExclusion]) + 1, 1);
	DECLARE @geom1 geometry = [dbo].[GetPolygonInner](1);
	DECLARE @geom2 geometry = [dbo].[GetPolygonInner](2);
	SET IDENTITY_INSERT [dbo].[ZonasDeExclusion] ON;
	BEGIN TRY
		-- ZonasDeExclusion
		INSERT [dbo].[ZonasDeExclusion] (
			[OBJECTID],
			[PlanId],
			[SHAPE]
		)
		VALUES (
			@id,
			1,
			@geom1
		);
		INSERT [dbo].[ZonasDeExclusion] (
			[OBJECTID],
			[PlanId],
			[SHAPE]
		)
		VALUES (
			@id,
			2,
			@geom2
		);
	END TRY
	BEGIN CATCH
		SET @actualError = ERROR_NUMBER()
	END CATCH
	
	SET IDENTITY_INSERT [dbo].[ZonasDeExclusion] OFF;
	EXEC tSQLt.assertEquals
		@expectedError,
		@actualError,
		'La tabla ZonasDeExclusion no debe permitir Id duplicados';
    IF (SELECT COUNT(1) FROM [dbo].[ZonasDeExclusion] WHERE OBJECTID = @id) > 1
		EXEC tSQLt.Fail 'La tabla ZonasDeExclusion no debe tener mas de un registro con el mismo Id';
END
GO

/*
	El campo FechaCreacion de la tabla ZonasDeExclusion tiene default
*/
IF OBJECT_ID(N'[ZonasDeExclusionTablaTests].[test ZonasDeExclusion FechaCreado tiene default]', 'P') > 0
	DROP PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion FechaCreado tiene default];
GO
CREATE PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion FechaCreado tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = 0;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @id OUT;
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[ZonasDeExclusion] WHERE OBJECTID = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de FechaCreado no implementada';
END
GO

/*
	El campo FechaModificacion de la tabla ZonasDeExclusion tiene default
*/
IF OBJECT_ID(N'[ZonasDeExclusionTablaTests].[test ZonasDeExclusion FechaModificacion tiene default]', 'P') > 0
	DROP PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion FechaModificacion tiene default];
GO
CREATE PROCEDURE [ZonasDeExclusionTablaTests].[test ZonasDeExclusion FechaModificacion tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = 0;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @id OUT;
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[ZonasDeExclusion] WHERE OBJECTID = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de FechaModificado no implementada';
END
GO

-- EXEC tSQLt.RunTestClass 'ZonasDeExclusionTablaTests';
-- GO
