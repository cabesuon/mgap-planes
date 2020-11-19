-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ForInsertChacrasTests';
GO

/*
	1 - Existe el trigger ForInsertChacras
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 1 ForInsertChacras Existe el trigger]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 1 ForInsertChacras Existe el trigger];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 1 ForInsertChacras Existe el trigger]
AS
BEGIN
  EXEC tSQLt.AssertObjectExists '[dbo].[ForInsertChacras]';
END
GO

/*
	2 - Valor de Estado igual E, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 2 ForInsertChacras Valor de Estado igual E, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 2 ForInsertChacras Valor de Estado igual E, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 2 ForInsertChacras Valor de Estado igual E, insercion sin valor]
AS
BEGIN
  DECLARE @expected char(1) = 'E';
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE
    )
  VALUES
    (
      @id, @id, @id, @id, @geom
	);
  DECLARE @actual char(1) = (SELECT Estado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'El valor de Estado luego de una insercion debe ser E';
END
GO

/*
	3 - Valor de Estado igual E, insercion con valor E
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 3 ForInsertChacras Valor de Estado igual E, insercion valor E]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 3 ForInsertChacras Valor de Estado igual E, insercion valor E];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 3 ForInsertChacras Valor de Estado igual E, insercion valor E]
AS
BEGIN
  DECLARE @expected char(1) = 'E';
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, Estado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, 'E'
	);
  DECLARE @actual char(1) = (SELECT Estado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'El valor de Estado luego de una insercion debe ser E';
END
GO

/*
	4 - Valor de Estado igual E, insercion con valor A
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 4 ForInsertChacras Valor de Estado igual E, insercion valor A]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 4 ForInsertChacras Valor de Estado igual E, insercion valor A];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 4 ForInsertChacras Valor de Estado igual E, insercion valor A]
AS
BEGIN
  DECLARE @expected char(1) = 'E';
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, Estado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, 'A'
	);
  DECLARE @actual char(1) = (SELECT Estado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'El valor de Estado luego de una insercion debe ser E';
END
GO

/*
	5 - Valor de FechaCreado igual Now, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 5 ForInsertChacras Valor de FechaCreado igual Now, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 5 ForInsertChacras Valor de FechaCreado igual Now, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 5 ForInsertChacras Valor de FechaCreado igual Now, insercion sin valor]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE
    )
  VALUES
    (
      @id, @id, @id, @id, @geom
	);
  DECLARE @actualDate date = (SELECT FechaCreado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	6 - Valor de FechaCreado igual Now, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 6 ForInsertChacras Valor de FechaCreado igual Now, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 6 ForInsertChacras Valor de FechaCreado igual Now, insercion valor now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 6 ForInsertChacras Valor de FechaCreado igual Now, insercion valor now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaCreado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, GETDATE()
	);
  DECLARE @actualDate date = (SELECT FechaCreado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	7 - Valor de FechaCreado igual Now, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 7 ForInsertChacras Valor de FechaCreado igual Now, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 7 ForInsertChacras Valor de FechaCreado igual Now, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 7 ForInsertChacras Valor de FechaCreado igual Now, insercion valor mayor a now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaCreado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, DATEADD(YEAR, 1, GETDATE())
	);
  DECLARE @actualDate date = (SELECT FechaCreado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	8 - Valor de FechaCreado igual Now, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 8 ForInsertChacras Valor de FechaCreado igual Now, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 8 ForInsertChacras Valor de FechaCreado igual Now, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 8 ForInsertChacras Valor de FechaCreado igual Now, insercion valor menor a now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaCreado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, DATEADD(YEAR, -1, GETDATE())
	);
  DECLARE @actualDate date = (SELECT FechaCreado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	9 - Valor de FechaModificado igual Now, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 9 ForInsertChacras Valor de FechaModificado igual Now, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 9 ForInsertChacras Valor de FechaModificado igual Now, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 9 ForInsertChacras Valor de FechaModificado igual Now, insercion sin valor]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE
    )
  VALUES
    (
      @id, @id, @id, @id, @geom
	);
  DECLARE @actualDate date = (SELECT FechaModificado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	10 - Valor de FechaModificado igual Now, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 10 ForInsertChacras Valor de FechaModificado igual Now, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 10 ForInsertChacras Valor de FechaModificado igual Now, insercion valor now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 10 ForInsertChacras Valor de FechaModificado igual Now, insercion valor now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaModificado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, GETDATE()
	);
  DECLARE @actualDate date = (SELECT FechaModificado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	11 - Valor de FechaModificado igual Now, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 11 ForInsertChacras Valor de FechaModificado igual Now, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 11 ForInsertChacras Valor de FechaModificado igual Now, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 11 ForInsertChacras Valor de FechaModificado igual Now, insercion valor mayor a now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaModificado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, DATEADD(YEAR, 1, GETDATE())
	);
  DECLARE @actualDate date = (SELECT FechaModificado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	12 - Valor de FechaModificado igual Now, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 12 ForInsertChacras Valor de FechaModificado igual Now, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 12 ForInsertChacras Valor de FechaModificado igual Now, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 12 ForInsertChacras Valor de FechaModificado igual Now, insercion valor menor a now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaModificado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, DATEADD(YEAR, -1, GETDATE())
	);
  DECLARE @actualDate date = (SELECT FechaModificado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  DECLARE @endDate date = GETDATE();
  IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	13 - Valor de FechaEliminado igual NULL, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 13 ForInsertChacras Valor de FechaEliminado igual NULL, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 13 ForInsertChacras Valor de FechaEliminado igual NULL, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 13 ForInsertChacras Valor de FechaEliminado igual NULL, insercion sin valor]
AS
BEGIN
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE
    )
  VALUES
    (
      @id, @id, @id, @id, @geom
	);
  DECLARE @expectedDate date = null;
  DECLARE @actualDate date = (SELECT FechaEliminado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	14 - Valor de FechaEliminado igual NULL, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 14 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 14 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 14 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaEliminado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, GETDATE()
	);
  DECLARE @expectedDate date = null;
  DECLARE @actualDate date = (SELECT FechaEliminado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	15 - Valor de FechaEliminado igual NULL, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 15 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 15 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 15 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor mayor a now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaEliminado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, DATEADD(YEAR, 1, GETDATE())
	);
  DECLARE @expectedDate date = null;
  DECLARE @actualDate date = (SELECT FechaEliminado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	16 - Valor de FechaEliminado igual NULL, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertChacrasTests].[test 16 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertChacrasTests].[test 16 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertChacrasTests].[test 16 ForInsertChacras Valor de FechaEliminado igual NULL, insercion valor menor a now]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @id int = [dbo].[GetNextChacraId]();
  DECLARE @geom geometry = [dbo].[GetPolygon](0);
  INSERT INTO [dbo].[Chacras]
    (
    Id, Nro, PlanId, PlanNro, SHAPE, FechaEliminado
    )
  VALUES
    (
      @id, @id, @id, @id, @geom, DATEADD(YEAR, -1, GETDATE())
	);
  DECLARE @expectedDate date = null;
  DECLARE @actualDate date = (SELECT FechaEliminado
  FROM [dbo].[Chacras]
  WHERE Id = @id);
  EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

-- EXEC tSQLt.RunTestClass '[ForInsertChacrasTests]';
-- GO
