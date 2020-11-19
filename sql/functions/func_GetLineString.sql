-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[GetLineString]') IS NOT NULL
	DROP FUNCTION [dbo].[GetLineString];
GO
CREATE FUNCTION [dbo].[GetLineString] (
	@nro int = 0
) RETURNS geometry
AS
BEGIN
	DECLARE @delta float = @nro * 100;
	DECLARE @unit geometry = geometry::STGeomFromText(
			'LINESTRING (371325 6253525,371375 6253575)',
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
