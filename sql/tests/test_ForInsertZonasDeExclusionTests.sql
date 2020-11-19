-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ForInsertZonasDeExclusionTests';
GO

/*
	1 - Existe el trigger ForInsertZonasDeExclusion
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 1 ForInsertZonasDeExclusion Existe el trigger]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 1 ForInsertZonasDeExclusion Existe el trigger];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 1 ForInsertZonasDeExclusion Existe el trigger]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[ForInsertZonasDeExclusion]';
END
GO

/*
	2 - Valor de FechaCreado igual Now, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 2 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 2 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 2 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion sin valor]
AS
BEGIN
	DECLARE @startDate date = GETDATE();

	DECLARE @id int;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = 1,
      @Geom = @geom,
	  @Id = @id OUT;
	
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[ZonasDeExclusion] WHERE OBJECTID = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	3 - Valor de FechaCreado igual Now, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 3 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 3 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 3 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();

	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaCreado
	) VALUES (
		1, @geomZona, GETDATE()
	);

	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	4 - Valor de FechaCreado igual Now, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 4 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 4 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 4 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor mayor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaCreado
	) VALUES (
		1, @geomZona, DATEADD(YEAR, 1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	5 - Valor de FechaCreado igual Now, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 5 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 5 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 5 ForInsertZonasDeExclusion Valor de FechaCreado igual Now, insercion valor menor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaCreado
	) VALUES (
		1, @geomZona, DATEADD(YEAR, -1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	6 - Valor de FechaModificado igual Now, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 6 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 6 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 6 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion sin valor]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE
	) VALUES (
		1, @geomZona
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	7 - Valor de FechaModificado igual Now, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 7 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 7 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 7 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaModificado
	) VALUES (
		1, @geomZona, GETDATE()
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	8 - Valor de FechaModificado igual Now, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 8 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 8 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 8 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor mayor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaModificado
	) VALUES (
		1, @geomZona, DATEADD(YEAR, 1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	9 - Valor de FechaModificado igual Now, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 9 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 9 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 9 ForInsertZonasDeExclusion Valor de FechaModificado igual Now, insercion valor menor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaModificado
	) VALUES (
		1, @geomZona, DATEADD(YEAR, -1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	10 - Valor de FechaEliminado igual NULL, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 10 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 10 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 10 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion sin valor]
AS
BEGIN
	
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE
	) VALUES (
		1, @geomZona
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	11 - Valor de FechaEliminado igual NULL, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 11 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 11 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 11 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor now]
AS
BEGIN
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaEliminado
	) VALUES (
		1, @geomZona, GETDATE()
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	12 - Valor de FechaEliminado igual NULL, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 12 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 12 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 12 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor mayor a now]
AS
BEGIN
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaEliminado
	) VALUES (
		1, @geomZona, DATEADD(YEAR, 1, GETDATE())
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	13 - Valor de FechaEliminado igual NULL, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 13 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 13 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 13 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor menor a now]
AS
BEGIN
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaEliminado
	) VALUES (
		1, @geomZona, DATEADD(YEAR, -1, GETDATE())
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	14 - Valor de FechaEliminado igual NULL, insercion valor NULL
*/
IF OBJECT_ID(N'[ForInsertZonasDeExclusionTests].[test 14 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor NULL]', 'P') > 0
	DROP PROCEDURE [ForInsertZonasDeExclusionTests].[test 14 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor NULL];
GO
CREATE PROCEDURE [ForInsertZonasDeExclusionTests].[test 14 ForInsertZonasDeExclusion Valor de FechaEliminado igual NULL, insercion valor NULL]
AS
BEGIN
	DECLARE @geomZona geometry = [dbo].[GetPolygonInner](0);
	INSERT INTO [dbo].[ZonasDeExclusion] (
		PlanId, SHAPE, FechaEliminado
	) VALUES (
		1, @geomZona, NULL
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[ZonasDeExclusion] WHERE PlanId = 1);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

-- EXEC tSQLt.RunTestClass '[ForInsertZonasDeExclusionTests]';
-- GO
