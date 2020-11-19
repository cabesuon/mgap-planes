-- USE PlanesCoreGDB
-- GO
EXEC tSQLt.NewTestClass 'InsteadOfDeleteZonasDeExclusionTests';
GO

/*
	1 - Existe el trigger InsteadOfDeleteZonasDeExclusion
*/
IF OBJECT_ID(N'[InsteadOfDeleteZonasDeExclusionTests].[test 1 InsteadOfDeleteZonasDeExclusion Existe el trigger]', 'P') > 0
	DROP PROCEDURE [InsteadOfDeleteZonasDeExclusionTests].[test 1 InsteadOfDeleteZonasDeExclusion Existe el trigger];
GO
CREATE PROCEDURE [InsteadOfDeleteZonasDeExclusionTests].[test 1 InsteadOfDeleteZonasDeExclusion Existe el trigger]
AS
BEGIN
	EXEC tSQLt.AssertObjectExists '[dbo].[InsteadOfDeleteZonasDeExclusion]';
END
GO

/*
	2 - Eliminar zona de exclusion asociada a chacra en estado E
*/
IF OBJECT_ID(N'[InsteadOfDeleteZonasDeExclusionTests].[test 2 InsteadOfDeleteZonasDeExclusion Eliminar  zona de exclusion asociada a chacra en estado E]', 'P') > 0
	DROP PROCEDURE [InsteadOfDeleteZonasDeExclusionTests].[test 2 InsteadOfDeleteZonasDeExclusion Eliminar  zona de exclusion asociada a chacra en estado E];
GO
CREATE PROCEDURE [InsteadOfDeleteZonasDeExclusionTests].[test 2 InsteadOfDeleteZonasDeExclusion Eliminar  zona de exclusion asociada a chacra en estado E]
AS
BEGIN
	DECLARE @idChacra int;
  	DECLARE @idZona int;
	EXEC [dbo].[AddChacraPendiente]
    	@IdChacra = @idChacra OUT;
	
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = @idChacra,
      @Geom = @geom;
	
	DELETE FROM [dbo].[ZonasDeExclusion]
	WHERE OBJECTID = @idZona;

	IF EXISTS (SELECT OBJECTID FROM [dbo].[ZonasDeExclusion] WHERE OBJECTID = @idZona)
    EXEC tSQLt.Fail 'La zona de exclusion asociada a la chacra no fue eliminada';
END
GO

/*
	3 - Eliminar zona de exclusion asociada a plan con chacras en estado A
*/
IF OBJECT_ID(N'[InsteadOfDeleteZonasDeExclusionTests].[test 3 InsteadOfDeleteZonasDeExclusion Eliminar zona de exclusion asociada a plan con chacras en estado A]', 'P') > 0
	DROP PROCEDURE [InsteadOfDeleteZonasDeExclusionTests].[test 3 InsteadOfDeleteZonasDeExclusion Eliminar zona de exclusion asociada a plan con chacras en estado A];
GO
CREATE PROCEDURE [InsteadOfDeleteZonasDeExclusionTests].[test 3 InsteadOfDeleteZonasDeExclusion Eliminar zona de exclusion asociada a plan con chacras en estado A]
AS
BEGIN
  	DECLARE @startDate date = GETDATE();
	DECLARE @idChacra int;
	
	EXEC [dbo].[AddChacraPendiente]
		@IdChacra = @idChacra OUT;

	UPDATE [dbo].[Chacras]
	SET Estado = 'A'
	WHERE Id = @idChacra;
	
	DECLARE @idZona int;
	DECLARE @geom geometry = [dbo].[GetPolygonInner](0);
    EXEC [dbo].[ZonaDeExclusionBuilder]
      @PlanId = @idChacra,
      @Geom = @geom,
	  @Id = @idZona OUT;
	
	DELETE FROM [dbo].[ZonasDeExclusion]
	WHERE OBJECTID = @idZona;
	
  	DECLARE @endDate date = GETDATE();

	DECLARE @actualDate date = (
		SELECT FechaEliminado
		FROM [dbo].[ZonasDeExclusion]
		WHERE OBJECTID = @idZona
	);

  	IF @actualDate NOT BETWEEN @startDate AND @endDate
    EXEC tSQLt.Fail 'El valor de FechaEliminado de una zona asociada a un plan con chacras en estado "A" luego de una eliminacion debe ser Now';
END
GO

-- EXEC tSQLt.RunTestClass '[InsteadOfDeleteZonasDeExclusionTests]';
-- GO
