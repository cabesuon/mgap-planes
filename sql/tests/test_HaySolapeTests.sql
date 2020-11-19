-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'HaySolapeTests';
GO

/*
	1 - Existe la funcion HaySolape
*/
IF OBJECT_ID(N'[HaySolapeTests].[test 1 HaySolape Existe la funcion]', 'P') > 0
	DROP PROCEDURE [HaySolapeTests].[test 1 HaySolape Existe la funcion];
GO
CREATE PROCEDURE [HaySolapeTests].[test 1 HaySolape Existe la funcion]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[HaySolape]';
END
GO

/*
	2 - No hay solape, poligonos sin interseccion
*/
IF OBJECT_ID(N'[HaySolapeTests].[test 2 HaySolapeTests No hay solape, poligonos sin interseccion]', 'P') > 0
	DROP PROCEDURE [HaySolapeTests].[test 2 HaySolapeTests No hay solape, poligonos sin interseccion];
GO
CREATE PROCEDURE [HaySolapeTests].[test 2 HaySolapeTests No hay solape, poligonos sin interseccion]
AS
BEGIN
	DECLARE @expected int = 0;
  DECLARE @geom1 geometry = geometry::STGeomFromText('POLYGON((2 4, 1 3, 1 1, 2 0, 4 1, 3 3, 2 4))', 0);
  DECLARE @geom2 geometry = [dbo].[STMove](@geom1, 10, 10, 0, 0, 3, 2);
	DECLARE @actual int = [dbo].[HaySolape](@geom1, @geom2);
	EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'No hay solape, poligonos sin interseccion.';
END
GO


/*
	3 - No hay solape, poligonos se tocan en un vertice
*/
IF OBJECT_ID(N'[HaySolapeTests].[test 3 HaySolapeTests No hay solape, poligonos se tocan en un vertice]', 'P') > 0
	DROP PROCEDURE [HaySolapeTests].[test 3 HaySolapeTests No hay solape, poligonos se tocan en un vertice];
GO
CREATE PROCEDURE [HaySolapeTests].[test 3 HaySolapeTests No hay solape, poligonos se tocan en un vertice]
AS
BEGIN
	DECLARE @expected int = 0;
  DECLARE @geom1 geometry = geometry::STGeomFromText('POLYGON((2 4, 1 3, 1 1, 2 0, 4 1, 3 3, 2 4))', 0);
  DECLARE @geom2 geometry = [dbo].[STMove](@geom1, 0, 4, 0, 0, 3, 2);
	DECLARE @actual int = [dbo].[HaySolape](@geom1, @geom2);
	EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'No hay solape, poligonos se tocan en un vertice.';
END
GO

/*
	4 - No hay solape, poligonos se tocan en una arista
*/
IF OBJECT_ID(N'[HaySolapeTests].[test 4 HaySolapeTests No hay solape, poligonos se tocan en una arista]', 'P') > 0
	DROP PROCEDURE [HaySolapeTests].[test 4 HaySolapeTests No hay solape, poligonos se tocan en una arista];
GO
CREATE PROCEDURE [HaySolapeTests].[test 4 HaySolapeTests No hay solape, poligonos se tocan en una arista]
AS
BEGIN
	DECLARE @expected int = 0;
  DECLARE @geom1 geometry = geometry::STGeomFromText('POLYGON((2 4, 1 3, 1 1, 2 0, 4 1, 3 3, 2 4))', 0);
  DECLARE @geom2 geometry = geometry::STGeomFromText('POLYGON((0 3, 0 1, 1 1, 1 3, 0 3))', 0);
	DECLARE @actual int = [dbo].[HaySolape](@geom1, @geom2);
	EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'No hay solape, poligonos se tocan en una arista.';
END
GO

/*
	5 - Hay solape, mismo poligono
*/
IF OBJECT_ID(N'[HaySolapeTests].[test 5 HaySolapeTests Hay solape, mismo poligono]', 'P') > 0
	DROP PROCEDURE [HaySolapeTests].[test 5 HaySolapeTests Hay solape, mismo poligono];
GO
CREATE PROCEDURE [HaySolapeTests].[test 5 HaySolapeTests Hay solape, mismo poligono]
AS
BEGIN
	DECLARE @expected int = 1;
  DECLARE @geom geometry = geometry::STGeomFromText('POLYGON((2 4, 1 3, 1 1, 2 0, 4 1, 3 3, 2 4))', 0);
  DECLARE @actual int = [dbo].[HaySolape](@geom, @geom);
	EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'Hay solape, mismo poligono.';
END
GO

/*
	6 - Hay solape, poligonos se contienen
*/
IF OBJECT_ID(N'[HaySolapeTests].[test 6 HaySolapeTests Hay solape, poligonos se contienen]', 'P') > 0
	DROP PROCEDURE [HaySolapeTests].[test 6 HaySolapeTests Hay solape, poligonos se contienen];
GO
CREATE PROCEDURE [HaySolapeTests].[test 6 HaySolapeTests Hay solape, poligonos se contienen]
AS
BEGIN
	DECLARE @expected int = 1;
  DECLARE @geom1 geometry = geometry::STGeomFromText('POLYGON((2 4, 1 3, 1 1, 2 0, 4 1, 3 3, 2 4))', 0);
  DECLARE @geom2 geometry = geometry::STGeomFromText('POLYGON((1 3, 1 1, 2 1, 2 3, 1 3))', 0);
	DECLARE @actual int = [dbo].[HaySolape](@geom1, @geom2);
	EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'Hay solape, poligonos se contienen.';
END
GO

/*
	7 - Hay solape, poligonos se intersectan
*/
IF OBJECT_ID(N'[HaySolapeTests].[test 7 HaySolapeTests Hay solape, poligonos se intersectan]', 'P') > 0
	DROP PROCEDURE [HaySolapeTests].[test 7 HaySolapeTests Hay solape, poligonos se intersectan];
GO
CREATE PROCEDURE [HaySolapeTests].[test 7 HaySolapeTests Hay solape, poligonos se intersectan]
AS
BEGIN
	DECLARE @expected int = 1;
  DECLARE @geom1 geometry = geometry::STGeomFromText('POLYGON((2 4, 1 3, 1 1, 2 0, 4 1, 3 3, 2 4))', 0);
  DECLARE @geom2 geometry = [dbo].[STMove](@geom1, 2, 0, 0, 0, 3, 2);
	DECLARE @actual int = [dbo].[HaySolape](@geom1, @geom2);
	EXEC tSQLt.assertEquals
		@expected,
		@actual,
		'Hay solape, poligonos se intersectan.';
END
GO

-- EXEC tSQLt.RunTestClass '[HaySolapeTests]';
-- GO
