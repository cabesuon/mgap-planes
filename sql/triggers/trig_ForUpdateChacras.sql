-- USE [PlanesCoreGDB];
-- GO

IF OBJECT_ID(N'[dbo].[ForUpdateChacras]', N'TR') IS NOT NULL  
	DROP TRIGGER [dbo].[ForUpdateChacras]; 
GO

CREATE TRIGGER [dbo].[ForUpdateChacras]
ON [dbo].[Chacras]
FOR UPDATE
AS
BEGIN

	DECLARE @ok int;
	SET @ok = 1;

	DECLARE @context varchar(MAX) = CONVERT(
		varchar(MAX),
		(
			SELECT i.Id
			FROM inserted i
			FOR XML AUTO	
		)
	);

	/*

		restricciones sobre campos:
			Id,
			Nro,
			PadreNro,
			PlanId,
			PlanNro,
			Estado
			FechaCreado,
			FechaModificado,
			FechaEliminado

	*/

	IF (UPDATE([Id]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
			@Context = @context,
			@Message = N'El campo "Id" no se puede actualizar.';
	END

	IF (UPDATE([Nro]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
			@Context = @context,
			@Message = N'El campo "Nro" no se puede actualizar.';
	END

	IF (UPDATE([PlanId]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
			@Context = @context,
			@Message = N'El campo "PlanId" no se puede actualizar.';
	END

	IF (UPDATE([PlanNro]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
			@Context = @context,
			@Message = N'El campo "PlanNro" no se puede actualizar.';
	END

	IF (UPDATE([FechaCreado]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
			@Context = @context,
			@Message = N'El campo "FechaCreado" se actualiza de forma automatica.';
	END

	IF (UPDATE([FechaModificado]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
			@Context = @context,
			@Message = N'El campo "FechaModificado" se actualiza de forma automatica.';
	END

	IF (UPDATE([FechaEliminado]))
	BEGIN
		SET @ok = 0;
		EXEC [dbo].[RaiseRollback]
			@Severity = 16,
			@State = 1,
			@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
			@Context = @context,
			@Message = N'El campo "FechaEliminado" se actualiza de forma automatica.';
	END

	/*

		restricciones sobre campos:
			Estado,
			SHAPE

	*/

	IF (UPDATE([Estado]) OR UPDATE([SHAPE]))
	BEGIN

		/*

			controlo que las chacras a insertar cumplen las condiciones
			entre ELLAS, es decir NO se pueden superponer chacas en estado A

		*/
		IF EXISTS (
			SELECT *
			FROM inserted i1, inserted i2
			WHERE
			i1.Id <> i2.Id
			AND
			i1.Estado = 'A'
			AND
			i2.Estado = 'A'
			AND
			[dbo].[HaySolape](i1.SHAPE, i2.SHAPE) = 1
		)
		BEGIN

			SET @context = CONVERT(
				varchar(MAX),
				(
					SELECT i1.Id, i2.Id
					FROM inserted i1, inserted i2
					WHERE
					i1.Id <> i2.Id
					AND
					i1.Estado = 'A'
					AND
					i2.Estado = 'A'
					AND
					[dbo].[HaySolape](i1.SHAPE, i2.SHAPE) = 1
					FOR XML AUTO
				)
			);

			SET @ok = 0;
			EXEC [dbo].[RaiseRollback]
				@Severity = 16,
				@State = 1,
				@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
				@Context = @context,
				@Message = N'Las chacras en estado "A" a insertar se superponen entre si.';
		END

		/*

			controlo que las chacras a insertar cumplen las condiciones
			con las chacras YA EXISTENTES, es decir NO se pueden superponer
			chacras en estado A

		*/
		IF EXISTS (
			SELECT *
			FROM inserted i, [dbo].[Chacras] c
			WHERE
			i.Id <> c.Id
			AND
			i.Estado = 'A'
			AND
			c.Estado = 'A'
			AND
			[dbo].[HaySolape](i.SHAPE, c.SHAPE) = 1
		)
		BEGIN

			SET @context = CONVERT(
				varchar(MAX),
				(
					SELECT i.Id, c.Id
					FROM inserted i, [dbo].[Chacras] c
					WHERE
					i.Id <> c.Id
					AND
					i.Estado = 'A'
					AND
					c.Estado = 'A'
					AND
					[dbo].[HaySolape](i.SHAPE, c.SHAPE) = 1
					FOR XML AUTO
				)
			);

			SET @ok = 0;
			EXEC [dbo].[RaiseRollback]
				@Severity = 16,
				@State = 1,
				@Procedure = N'TRIGGER [dbo].[ForUpdateChacras]',
				@Context = @context,
				@Message = N'Las chacras en estado "A" a insertar se superponen con chacras en estado "A" ya existentes.';
		END
	END

	/*

		actualizo las chacras

	*/

	IF @ok <> 0
	BEGIN
		DECLARE @fecha date = GETDATE();
		-- actualizo las chacras
		UPDATE [dbo].[Chacras]
		SET Estado = i.Estado,
			SHAPE = i.SHAPE,
			FechaModificado = @fecha
		FROM [dbo].[Chacras] c INNER JOIN inserted i ON c.Id = i.Id;
	END

END
