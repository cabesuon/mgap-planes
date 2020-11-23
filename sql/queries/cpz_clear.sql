USE [PlanesCoreGDB]
GO
-- deshabilito triggers de eliminacion
;DISABLE TRIGGER [dbo].[InsteadOfDeleteChacras] ON [dbo].[Chacras]
;DISABLE TRIGGER [dbo].[ForDeletePendientes] ON [dbo].[Pendientes]
;DISABLE TRIGGER [dbo].[InsteadOfDeleteZonasDeExclusion] ON [dbo].[ZonasDeExclusion]

DELETE FROM [dbo].[Chacras]
GO
DELETE FROM [dbo].[Pendientes]
GO
DELETE FROM [dbo].[ZonasDeExclusion]
GO

-- vuelvo habilitar triggers de eliminacion
ENABLE TRIGGER [dbo].[InsteadOfDeleteChacras] ON [dbo].[Chacras];
ENABLE TRIGGER [dbo].[ForDeletePendientes] ON [dbo].[Pendientes];
ENABLE TRIGGER [dbo].[InsteadOfDeleteZonasDeExclusion] ON [dbo].[ZonasDeExclusion];
