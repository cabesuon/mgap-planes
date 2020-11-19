-- USE PlanesCoreGDB
EXEC tSQLt.NewTestClass 'InsteadOfDeleteChacrasTests';

GO
/*
  1 - Existe el trigger InsteadOfDeleteChacras
  */
IF OBJECT_ID(
  N'[InsteadOfDeleteChacrasTests].[test 1 InsteadOfDeleteChacras Existe el trigger]',
  'P'
) > 0
  DROP PROCEDURE [InsteadOfDeleteChacrasTests].[test 1 InsteadOfDeleteChacras Existe el trigger];
GO
CREATE PROCEDURE [InsteadOfDeleteChacrasTests].[test 1 InsteadOfDeleteChacras Existe el trigger]
AS
BEGIN
  EXEC tSQLt.AssertObjectExists '[dbo].[InsteadOfDeleteChacras]';
END
GO

/*
  2 - Eliminar chacra, estado E
  */
IF OBJECT_ID(
  N'[InsteadOfDeleteChacrasTests].[test 2 InsteadOfDeleteChacras Eliminar chacra, estado E]',
  'P'
) > 0
  DROP PROCEDURE [InsteadOfDeleteChacrasTests].[test 2 InsteadOfDeleteChacras Eliminar chacra, estado E];
GO
CREATE PROCEDURE [InsteadOfDeleteChacrasTests].[test 2 InsteadOfDeleteChacras Eliminar chacra, estado E]
AS
BEGIN
  DECLARE @idChacra int;
  DECLARE @idPendiente int;
  DECLARE @idZona int;

  EXEC [dbo].[AddChacraPendiente] @IdChacra = @idChacra OUT,
  @IdPendiente = @idPendiente OUT;

  DELETE FROM
    [dbo].[Chacras]
  WHERE
    Id = @idChacra;

  IF EXISTS (
    SELECT
      Id
    FROM
      [dbo].[Chacras]
    WHERE
      Id = @idChacra
  ) EXEC tSQLt.Fail 'La chacra no fue eliminada';

  IF EXISTS (
    SELECT
      OBJECTID
    FROM
      [dbo].[Pendientes]
    WHERE
      OBJECTID = @idPendiente
  ) EXEC tSQLt.Fail 'La pendiente asociada a la chacra no fue eliminada';

END
GO

/*
  3 - Eliminar chacra, estado A
  */
IF OBJECT_ID(
  N'[InsteadOfDeleteChacrasTests].[test 3 InsteadOfDeleteChacras Eliminar chacra, estado A]',
  'P'
) > 0
DROP PROCEDURE [InsteadOfDeleteChacrasTests].[test 3 InsteadOfDeleteChacras Eliminar chacra, estado A];
GO
CREATE PROCEDURE [InsteadOfDeleteChacrasTests].[test 3 InsteadOfDeleteChacras Eliminar chacra, estado A]
AS
BEGIN
  DECLARE @startDate date = GETDATE();
  DECLARE @idChacra int;
  DECLARE @idPendiente int;
  DECLARE @idZona int;

  EXEC [dbo].[AddChacraPendiente]
  @IdChacra = @idChacra OUT,
  @IdPendiente = @idPendiente OUT;

  UPDATE
    [dbo].[Chacras]
  SET
    Estado = 'A'
  WHERE
    Id = @idChacra;

  DELETE FROM
    [dbo].[Chacras]
  WHERE
    Id = @idChacra;

  DECLARE @endDate date = GETDATE();

  DECLARE @actualDate date = (
    SELECT
      FechaEliminado
    FROM
      [dbo].[Chacras]
    WHERE
      Id = @idChacra
  );

  IF @actualDate NOT BETWEEN @startDate AND @endDate
    EXEC tSQLt.Fail 'El valor de FechaEliminado de la chacra luego de una eliminacion debe ser Now';

  SET
    @actualDate = (
      SELECT
        FechaEliminado
      FROM
        [dbo].[Pendientes]
      WHERE
        OBJECTID = @idPendiente
    );

  IF @actualDate NOT BETWEEN @startDate AND @endDate
    EXEC tSQLt.Fail 'El valor de FechaEliminado de la pendiente asociada a la chacra luego de una eliminacion debe ser Now';

END
GO

-- EXEC tSQLt.RunTestClass '[InsteadOfDeleteChacrasTests]';
-- GO
