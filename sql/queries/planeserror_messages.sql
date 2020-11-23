USE PlanesCoreGDB;

DECLARE @id int,
    @idChacra int,
    @geomChacra geometry,
    @geomPendiente geometry,
    @geomZonaDeExclusion geometry,
    @fecha datetime2(7);

SET @idChacra = [dbo].[GetNextChacraId]();
SET @geomChacra = [dbo].[GetPolygon](0);
SET @fecha = GETDATE();

/*

    FOR INSERT PENDIENTES

*/


/*
	La pendiente debe estar contenida en la chacra asociado
*/
EXEC [dbo].[ChacraBuilder]
    @Id = @idChacra,
    @Nro = @idChacra,
    @PlanId = @idChacra,
    @PlanNro = @idChacra,
    @geom = @geomChacra;
SET @geomPendiente = [dbo].[GetLineString](100);
BEGIN TRY
    INSERT INTO [dbo].[Pendientes] (
        ChacraId, SHAPE
    ) VALUES (
        @idChacra, @geomPendiente
    );
END TRY
BEGIN CATCH
    PRINT '>>> La pendiente debe estar contenida en la chacra asociado'
    PRINT ERROR_MESSAGE()
END CATCH
/*
	No pueden existir dos pendientes con mismo tipo asociadas a la misma chacra
*/
EXEC [dbo].[ChacraBuilder]
    @Id = @idChacra,
    @Nro = @idChacra,
    @PlanId = @idChacra,
    @PlanNro = @idChacra,
    @geom = @geomChacra;
SET @geomPendiente = [dbo].[GetLineString](0);
BEGIN TRY
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
END TRY
BEGIN CATCH
    PRINT '>>> No pueden existir dos pendientes con mismo tipo asociadas a la misma chacra'
    PRINT ERROR_MESSAGE()
END CATCH


/*

    FOR UPDATE CHACRAS

*/


/*
	restricciones sobre campos:
        Id,
        Nro,
        PlanId,
        PlanNro,
        FechaCreado,
        FechaModificado,
        FechaEliminado
*/
SET @idChacra = [dbo].[GetNextChacraId]();
SET @geomChacra = [dbo].[GetPolygon](0);
EXEC [dbo].[ChacraBuilder]
    @Id = @idChacra,
    @Nro = @idChacra,
    @PlanId = @idChacra,
    @PlanNro = @idChacra,
    @geom = @geomChacra;
BEGIN TRY
    UPDATE [dbo].[Chacras]
    SET Id = 999999
    WHERE Id = @idChacra;
END TRY
BEGIN CATCH
    PRINT '>>> El campo "Id" no se puede actualizar.'
    PRINT ERROR_MESSAGE()
END CATCH
BEGIN TRY
    UPDATE [dbo].[Chacras]
    SET Nro = 999999
    WHERE Id = @idChacra;
END TRY
BEGIN CATCH
    PRINT '>>> El campo "Nro" no se puede actualizar.'
    PRINT ERROR_MESSAGE()
END CATCH
BEGIN TRY
    UPDATE [dbo].[Chacras]
    SET PlanId = 999999
    WHERE Id = @idChacra;
END TRY
BEGIN CATCH
    PRINT '>>> El campo "PlanId" no se puede actualizar.'
    PRINT ERROR_MESSAGE()
END CATCH
BEGIN TRY
    UPDATE [dbo].[Chacras]
    SET PlanNro = 999999
    WHERE Id = @idChacra;
END TRY
BEGIN CATCH
    PRINT '>>> El campo "PlanNro" no se puede actualizar.'
    PRINT ERROR_MESSAGE()
END CATCH

BEGIN TRY
    UPDATE [dbo].[Chacras]
    SET FechaCreado = @fecha
    WHERE Id = @idChacra;
END TRY
BEGIN CATCH
    PRINT '>>> El campo "FechaCreado" no se puede actualizar.'
    PRINT ERROR_MESSAGE()
END CATCH
BEGIN TRY
    UPDATE [dbo].[Chacras]
    SET FechaModificado = @fecha
    WHERE Id = @idChacra;
END TRY
BEGIN CATCH
    PRINT '>>> El campo "FechaModificado" no se puede actualizar.'
    PRINT ERROR_MESSAGE()
END CATCH
BEGIN TRY
    UPDATE [dbo].[Chacras]
    SET FechaEliminado = @fecha
    WHERE Id = @idChacra;
END TRY
BEGIN CATCH
    PRINT '>>> El campo "FechaEliminado" no se puede actualizar.'
    PRINT ERROR_MESSAGE()
END CATCH

GO
