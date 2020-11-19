-- USE PlanesCoreGDB;
-- GO

/*

chacras

*/

ALTER TABLE [dbo].[Chacras] ADD
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
	[FechaCreado] datetime2(7) NULL,
	[FechaModificado] datetime2(7) NULL,
	[FechaEliminado] datetime2(7) NULL;

/* el campo id es unico de la tabla */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [UQ_Chacras_Id] UNIQUE ([Id]);
/* el estado de las chacras tiene que ser un estado de los permitidos */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [CK_Chacras_Estado] CHECK ([Estado] IN ('E', 'A'));
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [DF_Chacras_Estado] DEFAULT 'E' FOR [Estado];
/* default para fechas de creacion y modificacion */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [DF_Chacras_FechaCreado] DEFAULT GETDATE() FOR FechaCreado;
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [DF_Chacras_FechaModificado] DEFAULT GETDATE() FOR FechaModificado;

/*

pendientes

*/

ALTER TABLE [dbo].[Pendientes] ADD
	/* aplicacion */
	[ChacraId] int NOT NULL,
	[Tipo] char (1) NULL,
	/*
		C -> Computado
		M -> Manual
	*/
  /* administrativos */
	[FechaCreado] datetime2(7) NULL,
	[FechaModificado] datetime2(7) NULL,
	[FechaEliminado] datetime2(7) NULL;

/* el campo chacra id es FK a la tabla chacras */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [FK_Pendientes_ChacraId] FOREIGN KEY ([ChacraId])
	REFERENCES [dbo].[Chacras] ([Id]);
/* el tipo de las pendientes tiene que ser un tipo de los permitidos */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [CK_Pendientes_Tipo] CHECK ([Tipo] IN ('C', 'M'));
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [DF_Pendientes_Tipo] DEFAULT 'C' FOR [Tipo];
/* default para fechas de creacion y modificacion */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [DF_Pendientes_FechaCreado] DEFAULT GETDATE() FOR FechaCreado;
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [DF_Pendientes_FechaModificado] DEFAULT GETDATE() FOR FechaModificado;

/*

zonas de exclusion

*/

ALTER TABLE [dbo].[ZonasDeExclusion] ADD
	/* aplicacion */
	[PlanId] int NOT NULL,
	/* administrativos */
	[FechaCreado] datetime2(7) NULL,
	[FechaModificado] datetime2(7) NULL,
	[FechaEliminado] datetime2(7) NULL;

/* el campo chacra id es FK a la tabla chacras */
-- ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [FK_ZonasDeExclusion_ChacraId] FOREIGN KEY ([ChacraId])
-- 	REFERENCES [dbo].[Chacras] ([Id]);
/* default para fechas de creacion y modificacion */
ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [DF_ZonasDeExclusion_FechaCreado]
	DEFAULT GETDATE() FOR FechaCreado;
ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [DF_ZonasDeExclusion_FechaModificado]
	DEFAULT GETDATE() FOR FechaModificado;

/*

planes error

*/

ALTER TABLE [dbo].[PlanesError] ADD CONSTRAINT [DF_PlanesError_SystemDate]
	DEFAULT GETDATE() FOR [SystemDate];
ALTER TABLE [dbo].[PlanesError] ADD CONSTRAINT [DF_PlanesError_UtcDate]
	DEFAULT GETUTCDATE() FOR [UtcDate];

GO
