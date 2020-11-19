-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[HaySolape]') IS NOT NULL
	DROP FUNCTION [dbo].[HaySolape];
GO
CREATE FUNCTION [dbo].[HaySolape] (
	@Geom1 geometry,
	@Geom2 geometry
) RETURNS bit
AS
BEGIN
	DECLARE @Intersects int = @Geom1.STIntersects(@Geom2);
	DECLARE @Touches int = @Geom1.STTouches(@Geom2);
	IF @Intersects = 1 AND @Touches = 0
		RETURN 1;
	RETURN 0;
END;
