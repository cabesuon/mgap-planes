-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[GetPolygonInner]') IS NOT NULL
	DROP FUNCTION [dbo].[GetPolygonInner];
GO
CREATE FUNCTION [dbo].[GetPolygonInner] (
	@nro int = 0
) RETURNS geometry
AS
BEGIN
	DECLARE @delta int = @nro * 100;
	DECLARE @unit geometry = geometry::STGeomFromText(
			'POLYGON ((371310 6253520,371320 6253520,371320 6253510,371310 6253510,371310 6253520))',
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
