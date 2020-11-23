-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'PendientesTablaTests';
GO

/*
	1 - Existe la tabla Pendientes
*/
IF OBJECT_ID(N'[PendientesTablaTests].[test 1 Pendientes Existe la tabla]', 'P') > 0
	DROP PROCEDURE [PendientesTablaTests].[test 1 Pendientes Existe la tabla];
GO
CREATE PROCEDURE [PendientesTablaTests].[test 1 Pendientes Existe la tabla]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[Pendientes]';
END
GO

/*
	2 - La metadata de la tabla Pendientes es correcta
*/
IF OBJECT_ID(N'[PendientesTablaTests].[test 2 Pendientes Metadata correcta]', 'P') > 0
	DROP PROCEDURE [PendientesTablaTests].[test 2 Pendientes Metadata correcta];
GO
CREATE PROCEDURE [PendientesTablaTests].[test 2 Pendientes Metadata correcta]
AS
BEGIN
	IF OBJECT_ID(N'[PendientesTablaTests].[Pendientes]') > 0 DROP TABLE [PendientesTablaTests].[Pendientes];
	CREATE TABLE [PendientesTablaTests].[Pendientes] (
		[ChacraId] int NOT NULL,
		[Tipo] char (1) NULL,
		[FechaCreado] datetime2(7) NULL,
		[FechaModificado] datetime2(7) NULL,
		[FechaEliminado] datetime2(7) NULL,
		[OBJECTID] int NOT NULL,
		[SHAPE] geometry NOT NULL
	);
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @id OUT;
	INSERT INTO [PendientesTablaTests].[Pendientes]
	SELECT * FROM [dbo].[Pendientes];
	EXEC tSQLt.AssertEqualsTableSchema
		'[PendientesTablaTests].[Pendientes]',
		'[dbo].[Pendientes]';
END
GO

/*
	3 - El campo Id auto incrementa
*/
IF OBJECT_ID(N'[PendientesTablaTests].[test 3 Pendientes Id auto incrementa]', 'P') > 0
	DROP PROCEDURE [PendientesTablaTests].[test 3 Pendientes Id auto incrementa];
GO
CREATE PROCEDURE [PendientesTablaTests].[test 3 Pendientes Id auto incrementa]
AS
BEGIN
	DECLARE @firstId int, @actualId int, @expectedId int;
	DECLARE @geom geometry = [dbo].[GetLineString](1);
	BEGIN TRY
		EXEC [dbo].[AddChacraPendiente]
			@IdPendiente = @firstId OUT;
		EXEC [dbo].[AddChacraPendiente]
			@IdPendiente = @actualId OUT;
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
	El campo Id de la tabla Pendientes es unico
*/
IF OBJECT_ID(N'[PendientesTablaTests].[test 4 Pendientes Id es unico]', 'P') > 0
	DROP PROCEDURE [PendientesTablaTests].[test 4 Pendientes Id es unico];
GO
CREATE PROCEDURE [PendientesTablaTests].[test 4 Pendientes Id es unico]
AS
BEGIN
	DECLARE @expectedError int = 2627;
	DECLARE @actualError int = 0;
	DECLARE @id int = COALESCE((SELECT MAX(OBJECTID) FROM [dbo].[Pendientes]) + 1, 1);
	DECLARE @geom1 geometry = [dbo].[GetLineString](1);
	DECLARE @geom2 geometry = [dbo].[GetLineString](2);
	SET IDENTITY_INSERT [dbo].[Pendientes] ON;
	BEGIN TRY
		-- chacra 1
		DECLARE @chacraId1 int = [dbo].[GetNextChacraId]();
		DECLARE @chacraGeom1 geometry = [dbo].[GetPolygon](1);
		EXEC [dbo].[ChacraBuilder]
			@Id = @chacraId1,
			@Nro = @chacraId1,
			@PlanId = @chacraId1,
			@PlanNro = @chacraId1,
			@geom = @chacraGeom1;
		-- chacra 2
		DECLARE @chacraId2 int = [dbo].[GetNextChacraId]();
		DECLARE @chacraGeom2 geometry = [dbo].[GetPolygon](2);
		EXEC [dbo].[ChacraBuilder]
			@Id = @chacraId2,
			@Nro = @chacraId2,
			@PlanId = @chacraId2,
			@PlanNro = @chacraId2,
			@geom = @chacraGeom2;
		-- pendientes
		INSERT [dbo].[Pendientes] (
			[OBJECTID],
			[ChacraId],
			[SHAPE]
		)
		VALUES (
			@id,
			@chacraId1,
			@geom1
		);
		INSERT [dbo].[Pendientes] (
			[OBJECTID],
			[ChacraId],
			[SHAPE]
		)
		VALUES (
			@id,
			@chacraId2,
			@geom2
		);
	END TRY
	BEGIN CATCH
		SET @actualError = ERROR_NUMBER()
	END CATCH
	
	SET IDENTITY_INSERT [dbo].[Pendientes] OFF;
	EXEC tSQLt.assertEquals
		@expectedError,
		@actualError,
		'La tabla Pendientes no debe permitir Id duplicados';
    IF (SELECT COUNT(1) FROM [dbo].[Pendientes] WHERE OBJECTID = @id) > 1
		EXEC tSQLt.Fail 'La tabla Pendientes no debe tener mas de un registro con el mismo Id';
END
GO

/*
	El campo Tipo de la tabla Pendientes tiene default 'C'
*/
IF OBJECT_ID(N'[PendientesTablaTests].[test 5 Pendientes Tipo tiene default]', 'P') > 0
	DROP PROCEDURE [PendientesTablaTests].[test 5 Pendientes Tipo tiene default];
GO
CREATE PROCEDURE [PendientesTablaTests].[test 5 Pendientes Tipo tiene default]
AS
BEGIN
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @id OUT;
	DECLARE @expectedTipo char(1) = 'C';
	DECLARE @actualTipo char(1) = (SELECT Tipo FROM [dbo].[Pendientes] WHERE OBJECTID = @id);
	EXEC tSQLt.assertEquals
		@expectedTipo,
		@actualTipo,
		'Restriccion de tipo default no implementada';
END
GO

/*
	El campo FechaCreacion de la tabla Pendientes tiene default
*/
IF OBJECT_ID(N'[PendientesTablaTests].[test 6 Pendientes FechaCreado tiene default]', 'P') > 0
	DROP PROCEDURE [PendientesTablaTests].[test 6 Pendientes FechaCreado tiene default];
GO
CREATE PROCEDURE [PendientesTablaTests].[test 6 Pendientes FechaCreado tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @id OUT;
	DECLARE @actualDate date = (SELECT FechaCreado FROM [dbo].[Pendientes] WHERE OBJECTID = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de FechaCreado no implementada';
END
GO

/*
	El campo FechaModificacion de la tabla Pendientes tiene default
*/
IF OBJECT_ID(N'[PendientesTablaTests].[test 7 Pendientes FechaModificacion tiene default]', 'P') > 0
	DROP PROCEDURE [PendientesTablaTests].[test 7 Pendientes FechaModificacion tiene default];
GO
CREATE PROCEDURE [PendientesTablaTests].[test 7 Pendientes FechaModificacion tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = 0;
	EXEC [dbo].[AddChacraPendiente]
		@IdPendiente = @id OUT;
	DECLARE @actualDate date = (SELECT FechaModificado FROM [dbo].[Pendientes] WHERE OBJECTID = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de FechaModificado no implementada';
END
GO

-- EXEC tSQLt.RunTestClass 'PendientesTablaTests';
-- GO
