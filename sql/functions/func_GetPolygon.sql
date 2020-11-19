-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[GetPolygon]') IS NOT NULL
	DROP FUNCTION [dbo].[GetPolygon];
GO
CREATE FUNCTION [dbo].[GetPolygon] (
	@nro int = 0
) RETURNS geometry
AS
BEGIN
	DECLARE @delta int = @nro * 100;
	DECLARE @unit geometry = geometry::STGeomFromText(
		'POLYGON ((371300 6253600,371400 6253600,371400 6253500,371300 6253500,371300 6253600))',
		32721
	);
	DECLARE @geom geometry = [dbo].[STMove](
		@unit,
		@delta,
		@delta,
		@delta,
		@delta,
		3,
		2
	);
	RETURN @geom;
END;
