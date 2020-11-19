-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[InsteadOfDeleteZonasDeExclusion]', N'TR') IS NOT NULL  
    DROP TRIGGER [dbo].[InsteadOfDeleteZonasDeExclusion]; 
GO

CREATE TRIGGER [dbo].[InsteadOfDeleteZonasDeExclusion]
ON [dbo].[ZonasDeExclusion]
INSTEAD OF DELETE
AS
BEGIN
	/*

		Las zonas asociadas a planes con chacras en estado 'A' pasan a historico

	*/

    IF EXISTS(
        SELECT *
        FROM [dbo].[ZonasDeExclusion] z, deleted d, [dbo].[Chacras] c
        WHERE
        z.OBJECTID = d.OBJECTID
        AND
        d.PlanId = c.PlanId
        AND
        c.Estado = 'A'
    )
    BEGIN
        DECLARE @fecha date = GETDATE();
        -- deshabilito el trigger de actualizacion
        ;DISABLE TRIGGER [dbo].[ForUpdateZonasDeExclusion] ON [dbo].[ZonasDeExclusion]
        -- actualizo las zonas asociadas a planes con chacras en estado 'A'
        UPDATE [dbo].[ZonasDeExclusion]
        SET FechaEliminado = @fecha
        FROM [dbo].[ZonasDeExclusion] z, deleted d, [dbo].[Chacras] c
        WHERE
        z.OBJECTID = d.OBJECTID
        AND
        d.PlanId = c.PlanId
        AND
        c.Estado = 'A';
        -- vuelvo habilitar el trigger de actualizacion
        ENABLE TRIGGER [dbo].[ForUpdateChacras] ON [dbo].[Chacras]
    END

    /*

		Las zonas asociadas a planes con chacras en estado 'E' se eliminan

	*/

    DELETE z
    FROM [dbo].[ZonasDeExclusion] z, deleted d, [dbo].[Chacras] c
    WHERE
    z.OBJECTID = d.OBJECTID
    AND
    d.PlanId = c.PlanId
    AND
    c.Estado = 'E';

END;
