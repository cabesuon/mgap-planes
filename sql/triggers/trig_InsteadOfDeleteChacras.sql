-- USE PlanesCoreGDB;

IF OBJECT_ID(N'[dbo].[InsteadOfDeleteChacras]', N'TR') IS NOT NULL  
    DROP TRIGGER [dbo].[InsteadOfDeleteChacras]; 
GO

CREATE TRIGGER [dbo].[InsteadOfDeleteChacras]
ON [dbo].[Chacras]
INSTEAD OF DELETE
AS
BEGIN
	/*

		Las chacras en estado 'A' pasan a historico

	*/
    DECLARE @fecha date = GETDATE();
    -- deshabilito el trigger de actualizacion
    ;DISABLE TRIGGER [dbo].[ForUpdateChacras] ON [dbo].[Chacras]
    -- actualizo las chacras en estado 'A'
    UPDATE [dbo].[Chacras]
    SET FechaEliminado = @fecha
    FROM [dbo].[Chacras] c INNER JOIN deleted d ON c.Id = d.Id
    WHERE d.Estado = 'A';
    -- vuelvo habilitar el trigger de actualizacion
    ENABLE TRIGGER [dbo].[ForUpdateChacras] ON [dbo].[Chacras]

    /*

		Las pendientes de chacras en estado 'A' pasan a historico

	*/
    -- deshabilito el trigger de actualizacion
    ;DISABLE TRIGGER [dbo].[ForUpdatePendientes] ON [dbo].[Pendientes]
    -- actualizo las pendientes de chacras en estado 'A'
    UPDATE [dbo].[Pendientes]
    SET FechaEliminado = @fecha
    FROM [dbo].[Pendientes] p
        INNER JOIN [dbo].[Chacras] c ON p.ChacraId = c.Id
        INNER JOIN deleted d ON c.Id = d.Id
    WHERE c.Estado = 'A';
    -- vuelvo habilitar el trigger de actualizacion
    ENABLE TRIGGER [dbo].[ForUpdatePendientes] ON [dbo].[Pendientes]

    /*

		Las pendientes de chacras en estado 'E' se eliminan

	*/
    DELETE p
    FROM [dbo].[Pendientes] p
    WHERE p.ChacraId IN (
        SELECT d.Id
        FROM deleted d
        WHERE d.Estado = 'E'
    );
    
    /*

		Las chacras en estado 'E' se eliminan

	*/

    DELETE c
    FROM [dbo].[Chacras] c INNER JOIN deleted d ON c.Id = d.Id
    WHERE c.Estado = 'E';

END;
