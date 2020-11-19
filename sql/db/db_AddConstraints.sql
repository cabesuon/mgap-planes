-- USE PlanesCoreGDB;
-- GO

/*

planes error

*/

ALTER TABLE [dbo].[PlanesError] ADD CONSTRAINT [DF_PlanesError_SystemDate]
	DEFAULT GETDATE() FOR [SystemDate];
ALTER TABLE [dbo].[PlanesError] ADD CONSTRAINT [DF_PlanesError_UtcDate]
	DEFAULT GETUTCDATE() FOR [UtcDate];

/*

chacras

*/

/* el campo id es unico de la tabla */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [UQ_Chacras_Id] UNIQUE ([Id]);
/* el estado de las chacras tiene que ser un estado de los permitidos */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [CK_Chacras_Estado] CHECK ([Estado] IN ('E', 'A'));
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [DF_Chacras_Estado] DEFAULT 'E' FOR [Estado];
/* default para fechas de creacion y modificacion */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [DF_Chacras_FechaCreado]
	DEFAULT GETDATE() FOR [FechaCreado];
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [DF_Chacras_FechaModificado]
	DEFAULT GETDATE() FOR [FechaModificado];

/* el campo id es el PK de la tabla */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [PK_Chacras_OBJECTID] PRIMARY KEY CLUSTERED ([OBJECTID]);
/* el SRID de las geometrias tiene que ser 32721 -> UTM21S */
ALTER TABLE [dbo].[Chacras] ADD CONSTRAINT [CK_Chacras_SHAPE] CHECK ([SHAPE].[STSrid]=(32721))

/* indice espacial */
CREATE SPATIAL INDEX [SIdx_Chacras_SHAPE] ON [dbo].[Chacras] ([SHAPE])
USING GEOMETRY_GRID WITH (
	BOUNDING_BOX = (366857.629800, 6107861.330600, 857550.931400, 6653214.830100),
	GRIDS = (medium, medium, medium, medium), /* default */ 
	CELLS_PER_OBJECT = 16 /* default */
)

/*

pendientes

*/

/* el campo chacra id es FK a la tabla chacras */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [FK_Pendientes_ChacraId] FOREIGN KEY ([ChacraId])
	REFERENCES [dbo].[Chacras] ([Id]);
/* el tipo de las pendientes tiene que ser un tipo de los permitidos */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [CK_Pendientes_Tipo] CHECK ([Tipo] IN ('C', 'M'));
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [DF_Pendientes_Tipo] DEFAULT 'C' FOR [Tipo];
/* default para fechas de creacion y modificacion */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [DF_Pendientes_FechaCreado]
	DEFAULT GETDATE() FOR [FechaCreado];
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [DF_Pendientes_FechaModificado]
	DEFAULT GETDATE() FOR [FechaModificado];

/* el campo id es el PK de la tabla */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [PK_Pendientes_OBJECTID] PRIMARY KEY CLUSTERED ([OBJECTID]);
/* el SRID de las geometrias tiene que ser 32721 -> UTM21S */
ALTER TABLE [dbo].[Pendientes] ADD CONSTRAINT [CK_Pendientes_SHAPE] CHECK ([SHAPE].[STSrid]=(32721))

/* indice espacial */
CREATE SPATIAL INDEX [SIdx_Pendientes_SHAPE] ON [dbo].[Pendientes] ([SHAPE])
USING GEOMETRY_GRID WITH (
	BOUNDING_BOX = (366857.629800, 6107861.330600, 857550.931400, 6653214.830100),
	GRIDS = (medium, medium, medium, medium), /* default */ 
	CELLS_PER_OBJECT = 16 /* default */
)

/*

zonas de exclusion

*/

/* el campo chacra id es FK a la tabla chacras */
-- ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [FK_ZonasDeExclusion_ChacraId] FOREIGN KEY ([ChacraId])
-- 	REFERENCES [dbo].[Chacras] ([Id]);
/* default para fechas de creacion y modificacion */
ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [DF_ZonasDeExclusion_FechaCreado]
	DEFAULT GETDATE() FOR [FechaCreado];
ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [DF_ZonasDeExclusion_FechaModificado]
	DEFAULT GETDATE() FOR [FechaModificado];

/* el campo id es el PK de la tabla */
ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [PK_ZonasDeExclusion_OBJECTID] PRIMARY KEY CLUSTERED ([OBJECTID]);
/* el SRID de las geometrias tiene que ser 32721 -> UTM21S */
ALTER TABLE [dbo].[ZonasDeExclusion] ADD CONSTRAINT [CK_ZonasDeExclusion_SHAPE] CHECK ([SHAPE].[STSrid]=(32721))

/* indice espacial */
CREATE SPATIAL INDEX [SIdx_ZonasDeExclusion_SHAPE] ON [dbo].[ZonasDeExclusion] ([SHAPE])
USING GEOMETRY_GRID WITH (
	BOUNDING_BOX = (366857.629800, 6107861.330600, 857550.931400, 6653214.830100),
	GRIDS = (medium, medium, medium, medium), /* default */ 
	CELLS_PER_OBJECT = 16 /* default */
)

GO
