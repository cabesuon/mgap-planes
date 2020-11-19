-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'PlanesErrorTablaTests';
GO

/*
	1 - Existe la tabla PlanesError
*/
IF OBJECT_ID(N'[PlanesErrorTablaTests].[test 1 PlanesError Existe la tabla]', 'P') > 0
	DROP PROCEDURE [PlanesErrorTablaTests].[test 1 PlanesError Existe la tabla];
GO
CREATE PROCEDURE [PlanesErrorTablaTests].[test 1 PlanesError Existe la tabla]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[PlanesError]';
END
GO

/*
	2 - La metadata de la tabla PlanesError es correcta
*/
IF OBJECT_ID(N'[PlanesErrorTablaTests].[test 2 PlanesError Metadata correcta]', 'P') > 0
	DROP PROCEDURE [PlanesErrorTablaTests].[test 2 PlanesError Metadata correcta];
GO
CREATE PROCEDURE [PlanesErrorTablaTests].[test 2 PlanesError Metadata correcta]
AS
BEGIN
	IF OBJECT_ID(N'[PlanesErrorTablaTests].[PlanesError]') > 0 DROP TABLE [PlanesErrorTablaTests].[PlanesError];
	CREATE TABLE [PlanesErrorTablaTests].[PlanesError] (
		[Id] int NOT NULL,
		[SystemDate] datetime NOT NULL,
		[UtcDate] datetime NOT NULL,
		[Severity] int NOT NULL,
		[State] int NOT NULL,
		[Procedure] varchar (128) NOT NULL,
		[Context] varchar (MAX) NOT NULL,
		[Message] varchar (MAX) NOT NULL
	);
	EXEC [dbo].[PlanesErrorBuilder]
		@Severity = 16,
		@State = 1,
		@Procedure = 'Procedure',
		@Message = 'Message',
		@Context = 'Context';
	INSERT INTO [PlanesErrorTablaTests].[PlanesError]
	SELECT * FROM [dbo].[PlanesError];
	EXEC tSQLt.AssertEqualsTableSchema
		'[PlanesErrorTablaTests].[PlanesError]',
		'[dbo].[PlanesError]';
END
GO

/*
	3 - El campo Id auto incrementa
*/
IF OBJECT_ID(N'[PlanesErrorTablaTests].[test 3 PlanesError Id auto incrementa]', 'P') > 0
	DROP PROCEDURE [PlanesErrorTablaTests].[test 3 PlanesError Id auto incrementa];
GO
CREATE PROCEDURE [PlanesErrorTablaTests].[test 3 PlanesError Id auto incrementa]
AS
BEGIN
	DECLARE @firstId int, @actualId int, @expectedId int;
	BEGIN TRY
		EXEC [dbo].[PlanesErrorBuilder]
			@Severity = 16,
			@State = 1,
			@Procedure = 'Procedure',
			@Message = 'Message',
			@Context = 'Context',
			@Id = @firstId OUT;
		EXEC [dbo].[PlanesErrorBuilder]
			@Severity = 16,
			@State = 1,
			@Procedure = 'Procedure',
			@Message = 'Message',
			@Context = 'Context',
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
	El campo Id de la tabla PlanesError es unico
*/
IF OBJECT_ID(N'[PlanesErrorTablaTests].[test PlanesError Id es unico]', 'P') > 0
	DROP PROCEDURE [PlanesErrorTablaTests].[test PlanesError Id es unico];
GO
CREATE PROCEDURE [PlanesErrorTablaTests].[test PlanesError Id es unico]
AS
BEGIN
	DECLARE @expectedError int = 2627;
	DECLARE @actualError int = 0;
	DECLARE @id int = COALESCE((SELECT MAX(Id) FROM [dbo].[PlanesError]) + 1, 1);
	SET IDENTITY_INSERT [dbo].[PlanesError] ON;
	BEGIN TRY
		-- PlanesError
		INSERT [dbo].[PlanesError] (
			[Id],
			[Severity],
			[State],
			[Procedure],
			[Context],
			[Message]
		)
		VALUES (
			@id,
			1,
			1,
			'',
			'',
			''
		);
		INSERT [dbo].[PlanesError] (
			[Id],
			[Severity],
			[State],
			[Procedure],
			[Context],
			[Message]
		)
		VALUES (
			@id,
			1,
			1,
			'',
			'',
			''
		);
	END TRY
	BEGIN CATCH
		SET @actualError = ERROR_NUMBER()
	END CATCH
	
	SET IDENTITY_INSERT [dbo].[PlanesError] OFF;
	EXEC tSQLt.assertEquals
		@expectedError,
		@actualError,
		'La tabla PlanesError no debe permitir Id duplicados';
    IF (SELECT COUNT(1) FROM [dbo].[PlanesError] WHERE [Id] = @id) > 1
		EXEC tSQLt.Fail 'La tabla PlanesError no debe tener mas de un registro con el mismo Id';
END
GO

/*
	El campo UtcDate de la tabla PlanesError tiene default
*/
IF OBJECT_ID(N'[PlanesErrorTablaTests].[test PlanesError UtcDate tiene default]', 'P') > 0
	DROP PROCEDURE [PlanesErrorTablaTests].[test PlanesError UtcDate tiene default];
GO
CREATE PROCEDURE [PlanesErrorTablaTests].[test PlanesError UtcDate tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = 0;
	EXEC [dbo].[PlanesErrorBuilder]
		@Severity = 16,
		@State = 1,
		@Procedure = 'Procedure',
		@Message = 'Message',
		@Context = 'Context',
		@Id = @id OUT;
	DECLARE @actualDate date = (SELECT UtcDate FROM [dbo].[PlanesError] WHERE [Id] = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de UtcDate no implementada';
END
GO

/*
	El campo SystemDate de la tabla PlanesError tiene default
*/
IF OBJECT_ID(N'[PlanesErrorTablaTests].[test PlanesError SystemDate tiene default]', 'P') > 0
	DROP PROCEDURE [PlanesErrorTablaTests].[test PlanesError SystemDate tiene default];
GO
CREATE PROCEDURE [PlanesErrorTablaTests].[test PlanesError SystemDate tiene default]
AS
BEGIN
	DECLARE @startDate date = GETDATE();
	DECLARE @id int = 0;
	EXEC [dbo].[PlanesErrorBuilder]
		@Severity = 16,
		@State = 1,
		@Procedure = 'Procedure',
		@Message = 'Message',
		@Context = 'Context',
		@Id = @id OUT;
	DECLARE @actualDate date = (SELECT SystemDate FROM [dbo].[PlanesError] WHERE [Id] = @id);
	DECLARE @endDate date = GETDATE();
	IF @actualDate NOT BETWEEN @startDate AND @endDate
		EXEC tSQLt.Fail 'Restriccion default de SystemDate no implementada';
END
GO

-- EXEC tSQLt.RunTestClass 'PlanesErrorTablaTests';
-- GO
