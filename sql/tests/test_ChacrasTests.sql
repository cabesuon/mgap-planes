-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'ChacrasTests';
GO

/*
	1 - Existe la tabla Chacras
*/
IF OBJECT_ID(N'[ChacrasTests].[test 1 Chacras Existe la tabla]', 'P') > 0
	DROP PROCEDURE [ChacrasTests].[test 1 Chacras Existe la tabla];
GO
CREATE PROCEDURE [ChacrasTests].[test 1 Chacras Existe la tabla]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[Chacras]';
END
GO

/*
	2 - La metadata de la tabla Chacras es correcta
*/
IF OBJECT_ID(N'[ChacrasTests].[test 2 Chacras Metadata correcta]', 'P') > 0
	DROP PROCEDURE [ChacrasTests].[test 2 Chacras Metadata correcta];
GO
CREATE PROCEDURE [ChacrasTests].[test 2 Chacras Metadata correcta]
AS
BEGIN
	IF OBJECT_ID(N'[ChacrasTests].[Chacras]') > 0 DROP TABLE [ChacrasTests].[Chacras];
	CREATE TABLE [ChacrasTests].[Chacras] (
		[Id] int NOT NULL,
		[Nro] int NOT NULL,
		[PlanId] int NOT NULL,
		[PlanNro] int NOT NULL,
		[Estado] char (1) NULL,
		[FechaCreado] datetime2(7) NULL,
		[FechaModificado] datetime2(7) NULL,
		[FechaEliminado] datetime2(7) NULL,
		[OBJECTID] int NOT NULL,
		[SHAPE] geometry NOT NULL
	);
	DECLARE @id int = [dbo].[GetNextChacraId]();
	DECLARE @geom geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @id,
		@Nro = @id,
		@PlanId = @id,
		@PlanNro = @id,
		@Geom = @geom;
	INSERT INTO [ChacrasTests].[Chacras]
	SELECT * FROM [dbo].[Chacras];
	EXEC tSQLt.AssertEqualsTableSchema
		'[ChacrasTests].[Chacras]',
		'[dbo].[Chacras]';
END
GO

/*
	3 - El campo Id de la tabla Chacras es unico
*/
IF OBJECT_ID(N'[ChacrasTests].[test 3 Chacras Id es unico]', 'P') > 0
	DROP PROCEDURE [ChacrasTests].[test 3 Chacras Id es unico];
GO
CREATE PROCEDURE [ChacrasTests].[test 3 Chacras Id es unico]
AS
BEGIN
	DECLARE @expectedError int = 2627;
	DECLARE @actualError int = 0;
	DECLARE @id int = [dbo].[GetNextChacraId]();
	DECLARE @geom geometry = [dbo].[GetPolygon](0);
	BEGIN TRY
		EXEC [dbo].[ChacraBuilder]
			@Id = @id,
			@Nro = @id,
			@PlanId = @id,
			@PlanNro = @id,
			@Geom = @geom;
		INSERT [dbo].[Chacras] (
			[Id],
			[Nro],
			[PlanId],
			[PlanNro],
			[SHAPE]
		)
		VALUES (
			@id,
			@id,
			@id,
			@id,
			@geom
		);
	END TRY
	BEGIN CATCH
		SET @actualError = ERROR_NUMBER()
	END CATCH
	EXEC tSQLt.assertEquals
		@expectedError,
		@actualError,
		'La tabla Chacras no debe permitir Id duplicados';
    IF (SELECT COUNT(1) FROM [dbo].[Chacras] WHERE Id = @id) > 1
		EXEC tSQLt.Fail 'La tabla Chacras no debe tener mas de un registro con el mismo Id';
END
GO

/*
	4 - El campo Estado de la tabla Chacras tiene default 'E'
*/
IF OBJECT_ID(N'[ChacrasTests].[test 4 Chacras Estado tiene default]', 'P') > 0
	DROP PROCEDURE [ChacrasTests].[test 4 Chacras Estado tiene default];
GO
CREATE PROCEDURE [ChacrasTests].[test 4 Chacras Estado tiene default]
AS
BEGIN
	DECLARE @id int = [dbo].[GetNextChacraId]();
	DECLARE @geom geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @id,
		@Nro = @id,
		@PlanId = @id,
		@PlanNro = @id,
		@Geom = @geom;
	DECLARE @expectedEstado char(1) = 'E';
	DECLARE @actualEstado char(1) = (SELECT Estado FROM [dbo].[Chacras] WHERE Id = @id);
	EXEC tSQLt.assertEquals
		@expectedEstado,
		@actualEstado,
		'Restriccion de estado default no implementada';
END
GO

/*
	5 - El campo FechaCreacion de la tabla Chacras tiene default
*/
IF OBJECT_ID(N'[ChacrasTests].[test 5 Chacras FechaCreado tiene default]', 'P') > 0
	DROP PROCEDURE [ChacrasTests].[test 5 Chacras FechaCreado tiene default];
GO
CREATE PROCEDURE [ChacrasTests].[test 5 Chacras FechaCreado tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = [dbo].[GetNextChacraId]();
	DECLARE @geom geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @id,
		@Nro = @id,
		@PlanId = @id,
		@PlanNro = @id,
		@Geom = @geom;
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[Chacras] WHERE Id = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de FechaCreado no implementada';
END
GO

/*
	6 - El campo FechaModificacion de la tabla Chacras tiene default
*/
IF OBJECT_ID(N'[ChacrasTests].[test 6 Chacras FechaModificacion tiene default]', 'P') > 0
	DROP PROCEDURE [ChacrasTests].[test 6 Chacras FechaModificacion tiene default];
GO
CREATE PROCEDURE [ChacrasTests].[test 6 Chacras FechaModificacion tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = [dbo].[GetNextChacraId]();
	DECLARE @geom geometry = [dbo].[GetPolygon](0);
	EXEC [dbo].[ChacraBuilder]
		@Id = @id,
		@Nro = @id,
		@PlanId = @id,
		@PlanNro = @id,
		@Geom = @geom;
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[Chacras] WHERE Id = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de FechaModificado no implementada';
END
GO

-- EXEC tSQLt.RunTestClass '[ChacrasTests]';
-- GO
