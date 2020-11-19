-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[Pendientes]') IS NOT NULL
	DROP TABLE [dbo].[Pendientes];
GO

IF OBJECT_ID(N'[dbo].[ZonasDeExclusion]') IS NOT NULL
	DROP TABLE [dbo].[ZonasDeExclusion];
GO

IF OBJECT_ID(N'[dbo].[Chacras]') IS NOT NULL
	DROP TABLE [dbo].[Chacras];
GO

IF OBJECT_ID(N'[dbo].[PlanesError]') IS NOT NULL
	DROP TABLE [dbo].[PlanesError];
GO

/*

chacras

*/

CREATE TABLE [dbo].[Chacras] (
	/* aplicacion */
	[Id] int NOT NULL,
	[Nro] int NOT NULL,
	[PlanId] int NOT NULL,
	[PlanNro] int NOT NULL,
	[Estado] char (1) NULL,
	/*
		E -> Edicion
		A -> Actual
	*/
	/* administrativos */
	[FechaCreado] date NULL,
	[FechaModificado] date NULL,
	[FechaEliminado] date NULL,

	/* arcgis */
	/* id */
	[OBJECTID] int NOT NULL IDENTITY (1,1) UNIQUE,
	/* geometria */
	[SHAPE] geometry NOT NULL
)

/*

pendientes

*/

CREATE TABLE [dbo].[Pendientes] (
	/* aplicacion */
	[ChacraId] int NOT NULL,
	[Tipo] char (1) NULL,
	/*
		C -> Computado
		M -> Manual
	*/
  	/* administrativos */
	[FechaCreado] date NULL,
	[FechaModificado] date NULL,
	[FechaEliminado] date NULL,

	/* arcgis */
	/* id */
	[OBJECTID] int NOT NULL IDENTITY (1,1) UNIQUE,
	/* geometria */
	[SHAPE] geometry NOT NULL
)

/*

zonas de exclusion

*/

CREATE TABLE [dbo].[ZonasDeExclusion] (
	/* aplicacion */
	[PlanId] int NOT NULL,
	/* administrativos */
	[FechaCreado] date NULL,
	[FechaModificado] date NULL,
	[FechaEliminado] date NULL,

	/* arcgis */
	/* id */
	[OBJECTID] int NOT NULL IDENTITY (1,1) UNIQUE,
	/* geometria */
	[SHAPE] geometry NOT NULL
)

/*

planes error

*/

CREATE TABLE [dbo].[PlanesError] (
	[Id] int NOT NULL IDENTITY (1,1) UNIQUE,
	[SystemDate] datetime NOT NULL,
	[UtcDate] datetime NOT NULL,
	[Severity] int NOT NULL,
	[State] int NOT NULL,
	[Procedure] varchar (128) NOT NULL,
	[Context] varchar (MAX) NOT NULL,
	[Message] varchar (MAX) NOT NULL
)
