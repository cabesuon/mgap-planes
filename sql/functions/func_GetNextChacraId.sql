-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[GetNextChacraId]') IS NOT NULL
	DROP FUNCTION [dbo].[GetNextChacraId];
GO
CREATE FUNCTION [dbo].[GetNextChacraId] () RETURNS int
AS
BEGIN
	DECLARE @id int = COALESCE((SELECT MAX(Id) FROM [dbo].[Chacras]) + 1, 1);
	RETURN @id;
END;
