-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ForInsertPendientesTests';
GO

/*
	1 - Existe el trigger ForInsertPendientes
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 1 ForInsertPendientes Existe el trigger]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 1 ForInsertPendientes Existe el trigger];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 1 ForInsertPendientes Existe el trigger]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[ForInsertPendientes]';
END
GO

/*
	2 - Valor de FechaCreado igual Now, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 2 ForInsertPendientes Valor de FechaCreado igual Now, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 2 ForInsertPendientes Valor de FechaCreado igual Now, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 2 ForInsertPendientes Valor de FechaCreado igual Now, insercion sin valor]
AS
BEGIN
	DECLARE @startDate date = GETDATE();

	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE
	) VALUES (
		@idChacra, @geomPendiente
	);
	
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	3 - Valor de FechaCreado igual Now, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 3 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 3 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 3 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();

	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaCreado
	) VALUES (
		@idChacra, @geomPendiente, GETDATE()
	);

	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	4 - Valor de FechaCreado igual Now, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 4 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 4 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 4 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor mayor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaCreado
	) VALUES (
		@idChacra, @geomPendiente, DATEADD(YEAR, 1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	5 - Valor de FechaCreado igual Now, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 5 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 5 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 5 ForInsertPendientes Valor de FechaCreado igual Now, insercion valor menor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaCreado
	) VALUES (
		@idChacra, @geomPendiente, DATEADD(YEAR, -1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaCreado luego de una insercion debe ser Now';
END
GO

/*
	6 - Valor de FechaModificado igual Now, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 6 ForInsertPendientes Valor de FechaModificado igual Now, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 6 ForInsertPendientes Valor de FechaModificado igual Now, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 6 ForInsertPendientes Valor de FechaModificado igual Now, insercion sin valor]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE
	) VALUES (
		@idChacra, @geomPendiente
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	7 - Valor de FechaModificado igual Now, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 7 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 7 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 7 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaModificado
	) VALUES (
		@idChacra, @geomPendiente, GETDATE()
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	8 - Valor de FechaModificado igual Now, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 8 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 8 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 8 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor mayor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaModificado
	) VALUES (
		@idChacra, @geomPendiente, DATEADD(YEAR, 1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	9 - Valor de FechaModificado igual Now, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 9 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 9 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 9 ForInsertPendientes Valor de FechaModificado igual Now, insercion valor menor a now]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaModificado
	) VALUES (
		@idChacra, @geomPendiente, DATEADD(YEAR, -1, GETDATE())
	);
	
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'El valor de FechaModificado luego de una insercion debe ser Now';
END
GO

/*
	10 - Valor de FechaEliminado igual NULL, insercion sin valor
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 10 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion sin valor]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 10 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion sin valor];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 10 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion sin valor]
AS
BEGIN
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE
	) VALUES (
		@idChacra, @geomPendiente
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	11 - Valor de FechaEliminado igual NULL, insercion valor Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 11 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 11 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 11 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor now]
AS
BEGIN
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaEliminado
	) VALUES (
		@idChacra, @geomPendiente, GETDATE()
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	12 - Valor de FechaEliminado igual NULL, insercion valor mayor a Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 12 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor mayor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 12 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor mayor a now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 12 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor mayor a now]
AS
BEGIN
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaEliminado
	) VALUES (
		@idChacra, @geomPendiente, DATEADD(YEAR, 1, GETDATE())
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	13 - Valor de FechaEliminado igual NULL, insercion valor menor a Now
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 13 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor menor a now]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 13 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor menor a now];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 13 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor menor a now]
AS
BEGIN
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaEliminado
	) VALUES (
		@idChacra, @geomPendiente, DATEADD(YEAR, -1, GETDATE())
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	14 - Valor de FechaEliminado igual NULL, insercion valor NULL
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 14 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor NULL]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 14 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor NULL];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 14 ForInsertPendientes Valor de FechaEliminado igual NULL, insercion valor NULL]
AS
BEGIN
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE, FechaEliminado
	) VALUES (
		@idChacra, @geomPendiente, NULL
	);
	
	DECLARE @expectedDate date = null;
	DECLARE @actualDate date = (SELECT FechaEliminado FROM [dbo].[Pendientes] WHERE ChacraId = @idChacra);
	EXEC tSQLt.assertEquals
		@expectedDate,
		@actualDate,
		'El valor de FechaEliminado luego de una insercion debe ser NULL';
END
GO

/*
	15 - La pendiente debe estar contenida en la chacra asociado
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 15 ForInsertPendientes La pendiente debe estar contenida en la chacra asociado]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 15 ForInsertPendientes La pendiente debe estar contenida en la chacra asociado];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 15 ForInsertPendientes La pendiente debe estar contenida en la chacra asociado]
AS
BEGIN
	DECLARE @expectedMessage char(2000) = N'Las Pendientes no estan contenidas en el area de la chacra asociada.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](100);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, SHAPE
	) VALUES (
		@idChacra, @geomPendiente
	);
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);
	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		N'Las Pendientes no estan contenidas en el area de la chacra asociada.';
END
GO

/*
	16 - No pueden existir dos pendientes con mismo tipo asociadas a la misma chacra
*/
IF OBJECT_ID(N'[ForInsertPendientesTests].[test 16 No pueden existir dos pendientes con mismo tipo asociadas a la misma chacra]', 'P') > 0
	DROP PROCEDURE [ForInsertPendientesTests].[test 16 No pueden existir dos pendientes con mismo tipo asociadas a la misma chacra];
GO
CREATE PROCEDURE [ForInsertPendientesTests].[test 16 No pueden existir dos pendientes con mismo tipo asociadas a la misma chacra]
AS
BEGIN
	DECLARE @expectedMessage char(2000) = N'Ya existe pendiente de igual tipo asociada a la chacra asociada.';
	EXEC tSQLt.SpyProcedure '[dbo].[RaiseRollback]';
	
	DECLARE @idChacra int = [dbo].[GetNextChacraId]();
	DECLARE @geomChacra geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @idChacra,
		@Nro = @idChacra,
		@PlanId = @idChacra,
		@PlanNro = @idChacra,
		@geom = @geomChacra;
	DECLARE @geomPendiente geometry = [dbo].[GetLineString](0);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, Tipo, SHAPE
	) VALUES (
		@idChacra, 'M', @geomPendiente
	);
	INSERT INTO [dbo].[Pendientes] (
		ChacraId, Tipo, SHAPE
	) VALUES (
		@idChacra, 'M', @geomPendiente
	);
	
	DECLARE @actualMessage char(2000) = (
		SELECT TOP(1) Message
		FROM [dbo].[RaiseRollback_SpyProcedureLog]
	);
	EXEC tSQLt.assertEquals
		@expectedMessage,
		@actualMessage,
		N'No pueden existir dos pendiente de igual tipo con la misma chacra asociada.';
END
GO

-- EXEC tSQLt.RunTestClass '[ForInsertPendientesTests]';
-- GO
