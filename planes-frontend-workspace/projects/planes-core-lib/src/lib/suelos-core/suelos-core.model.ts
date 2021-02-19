export interface SueloCore {
  sueloId: string;
  sueloDesc: string;
  sueloFactorK: number;
  sueloTolerancia: number;
  sueloSlopeMax: number;
  sueloSlopeMin: number;
}

export function createBaseSueloCore(i: number) {
  return {
    sueloId: `${i}`,
    sueloDesc: `Descripcion ${i}`,
    sueloFactorK: i,
    sueloTolerancia: i,
    sueloSlopeMax: i,
    sueloSlopeMin: i
  };
}

export interface SuelosCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  suelos: SueloCore[];
}

interface SueloCoreMetaFeature {
  attributes: {
    CODIGO: number;
    SUELO_R6: string;
    FACTOR_K: number;
    T: number;
  };
}
export interface SueloCoreMeta {
  features: SueloCoreMetaFeature[];
}

export const SUELOS_CORE_META = {
  displayFieldName: 'SC',
  fieldAliases: {
    CODIGO: 'CODIGO',
    SUELO_R6: 'SUELO_R6',
    FACTOR_K: 'FACTOR_K',
    T: 'T'
  },
  fields: [
    {
      name: 'CODIGO',
      type: 'esriFieldTypeInteger',
      alias: 'CODIGO'
    },
    {
      name: 'SUELO_R6',
      type: 'esriFieldTypeString',
      alias: 'SUELO_R6',
      length: 1073741822
    },
    {
      name: 'FACTOR_K',
      type: 'esriFieldTypeDouble',
      alias: 'FACTOR_K'
    },
    {
      name: 'T',
      type: 'esriFieldTypeInteger',
      alias: 'T'
    }
  ],
  features: [
    {
      attributes: {
        CODIGO: 1,
        SUELO_R6:
          'Alférez; Brunosol Subéutrico Lúvico L.                                                              ',
        FACTOR_K: 0.54000000000000004,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 2,
        SUELO_R6:
          'Alférez; Argisol Subéutrico Melánico, Abrúptico L.                                                  ',
        FACTOR_K: 0.47999999999999998,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 3,
        SUELO_R6:
          'Algorta; Argisol Dístrico Melánico, Abrupt. Ar. h.                                                  ',
        FACTOR_K: 0.20000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 4,
        SUELO_R6:
          'Algorta; Planosol Dístrico Ócrico Ar. h.                                                            ',
        FACTOR_K: 0.32000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 5,
        SUELO_R6:
          'Andresito; Brunosol Subéutrico Háplico ArFrGv,s.,r.                                                 ',
        FACTOR_K: 0.23000000000000001,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 6,
        SUELO_R6:
          'Angostura; Arenosol Ócrico                                                                          ',
        FACTOR_K: 0.089999999999999997,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 7,
        SUELO_R6:
          'Angostura; Planosol Dístrico Ócrico ArFr.                                                           ',
        FACTOR_K: 0.52000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 8,
        SUELO_R6:
          'Aparicio Saravia; Luvisol Ócrico Abrúptico Ar r.                                                    ',
        FACTOR_K: 0.52000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 9,
        SUELO_R6:
          'Aparicio Saravia; Acrisol Úmbrico Típico ArFr r.                                                    ',
        FACTOR_K: 0.52000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 10,
        SUELO_R6:
          'Arapey; Vertisol Háplico Ac                                                                         ',
        FACTOR_K: 0.10000000000000001,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 13,
        SUELO_R6:
          'Arroyo Hospital; Brunosol Subéutrico Lúvico Fr.                                                     ',
        FACTOR_K: 0.44,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 14,
        SUELO_R6:
          'Arroyo Hospital; Brunosol Subéutrico Háplico LAc s.                                                 ',
        FACTOR_K: 0.34999999999999998,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 15,
        SUELO_R6:
          'Bacacuá; Brunosol Subéutrico Lúvico Ar.                                                             ',
        FACTOR_K: 0.34999999999999998,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 16,
        SUELO_R6:
          'Balneario Jaureguiberry; Arenosol Ócrico                                                            ',
        FACTOR_K: 0.01,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 17,
        SUELO_R6:
          'Bañado de Farrapos; Gleysol Lúvico Melánico, Abrúptico LAc v.                                       ',
        FACTOR_K: 0.31,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 18,
        SUELO_R6:
          'Bañado de Oro; Argisol Subéutrico Melánico, Abrúptico Fr h.                                         ',
        FACTOR_K: 0.44,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 19,
        SUELO_R6: 'Bañado de Oro; Planosol Subéutrico Fr h.',
        FACTOR_K: 0.44,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 20,
        SUELO_R6:
          'Baygorria; Brunosol Éutrico Típico LAc v.                                                           ',
        FACTOR_K: 0.20999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 21,
        SUELO_R6:
          'Baygorria; Brunosol Éutrico Típico ArAc                                                             ',
        FACTOR_K: 0.22,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 22,
        SUELO_R6:
          'Baygorria; Vertisol Rúptico Típico ArAc                                                             ',
        FACTOR_K: 0.13,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 23,
        SUELO_R6:
          'Baygorria; Vertisol Rúptico Típico ArAc                                                             ',
        FACTOR_K: 0.19,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 24,
        SUELO_R6:
          'Baygorria; Vertisol Háplico Ac                                                                      ',
        FACTOR_K: 0.10000000000000001,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 25,
        SUELO_R6:
          'Baygorria; Vertisol Háplico Ac                                                                      ',
        FACTOR_K: 0.13,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 26,
        SUELO_R6:
          'Bellaco; Vertisol Rúptico Típico Ac                                                                 ',
        FACTOR_K: 0.089999999999999997,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 27,
        SUELO_R6:
          'Bellaco; Vertisol Rúptico Típico Ac                                                                 ',
        FACTOR_K: 0.14999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 28,
        SUELO_R6:
          'Bellaco; Vertisol Rúptico Lúvico ArAc                                            ',
        FACTOR_K: 0.10000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 29,
        SUELO_R6:
          'Bellaco; Vertisol Rúptico Lúvico ArAc                                          ',
        FACTOR_K: 0.17000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 30,
        SUELO_R6:
          'Bequeló; Brunosol Éutrico Háplico/Típico Fr/LAc v.                                                  ',
        FACTOR_K: 0.17999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 31,
        SUELO_R6:
          'Blanquillo; Brunosol Subéutrico Típico Fr v.                                                        ',
        FACTOR_K: 0.5,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 32,
        SUELO_R6:
          'Blanquillo; Argisol Subéutrico Melánico, Abrúptico Fr                                               ',
        FACTOR_K: 0.48999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 33,
        SUELO_R6:
          'Cañada Nieto; Brunosol Subéutrico Típico ArFr                                                       ',
        FACTOR_K: 0.34000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 34,
        SUELO_R6: 'Capilla de Farruco; Litosol Dístrico Melánico ArFr',
        FACTOR_K: 0.28000000000000003,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 35,
        SUELO_R6:
          'Carapé; Litosol Dístrico Úmbrico Ar                                                                 ',
        FACTOR_K: 0.34999999999999998,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 36,
        SUELO_R6:
          'Carpintería; Brunosol Éutrico Típico ArAc                                                           ',
        FACTOR_K: 0.20999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 37,
        SUELO_R6:
          'Carpintería; Vertisol Rúptico Lúvico ArAc                                                           ',
        FACTOR_K: 0.13,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 38,
        SUELO_R6:
          'Cebollatí; Fluvisol Heterotextural Melánico LAc                                                     ',
        FACTOR_K: 0.26000000000000001,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 39,
        SUELO_R6:
          'Cebollatí; Gleysol Lúvico Melánico Abrúptico LAc                                                    ',
        FACTOR_K: 0.5,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 40,
        SUELO_R6:
          'Cerro Chato; Brunosol Subéutrico Típico Fr mp.                                                      ',
        FACTOR_K: 0.26000000000000001,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 41,
        SUELO_R6:
          'Cerro Chato; Brunosol Subéutrico Háplico ArFr s.                                                    ',
        FACTOR_K: 0.53000000000000003,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 42,
        SUELO_R6:
          'Chapicuy; Brunosol Subéutrico Típico Ar r.                                                          ',
        FACTOR_K: 0.23999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 43,
        SUELO_R6:
          'Chapicuy; Argisol Subéutrico Ócrico, Abrúptico Ar                                                   ',
        FACTOR_K: 0.33000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 44,
        SUELO_R6:
          'Colonia Palma; Brunosol Subéutrico Lúvico ArFr h.                                                   ',
        FACTOR_K: 0.23000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 45,
        SUELO_R6:
          'Colonia Palma; Argisol Subéutrico Melánico Típico Fr v.                                             ',
        FACTOR_K: 0.35999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 46,
        SUELO_R6:
          'Constitución; Inceptisol Ócrico ArFr pd.                                                            ',
        FACTOR_K: 0.39000000000000001,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 47,
        SUELO_R6:
          'Constitución; Argisol Dístrico Melánico Típico Ar pd.                                               ',
        FACTOR_K: 0.20999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 48,
        SUELO_R6:
          'Cuaró; Brunosol Éutrico Típico  LAc v.                                                              ',
        FACTOR_K: 0.20999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 50,
        SUELO_R6:
          'Cuaró; Vertisol Háplico Ac                                                                          ',
        FACTOR_K: 0.13,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 51,
        SUELO_R6:
          'Cuaró; Planosol Éutrico Melánico LAc v., h.                                                         ',
        FACTOR_K: 0.45000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 52,
        SUELO_R6:
          'Cuchilla Caraguatá; Brunosol Éutrico Háplico LAc mp.                                                ',
        FACTOR_K: 0.20999999999999999,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 53,
        SUELO_R6:
          'Cuchilla Caraguatá; Brunosol Subéutrico Lúvico LAc                                                  ',
        FACTOR_K: 0.44,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 54,
        SUELO_R6:
          'Cuchilla Corrales; Luvisol Ócrico Álbico Ar                                                         ',
        FACTOR_K: 0.29999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 55,
        SUELO_R6:
          'Cuchilla de Corralito; Brunosol Subéutrico Lúvico Ar.                                               ',
        FACTOR_K: 0.29999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 56,
        SUELO_R6:
          'Cuchilla de Corralito; Vertisol Ruptico Luvico (Pri. y Ver.)                                       ',
        FACTOR_K: 0.10000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 57,
        SUELO_R6:
          'Cuchilla de Corralito; Vertisol Rúptico Lúvico ArAc                      ',
        FACTOR_K: 0.17000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 58,
        SUELO_R6:
          'Cuchilla de Haedo; Litosol Éutrico Melánico Fr ms.                                                  ',
        FACTOR_K: 0.23000000000000001,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 59,
        SUELO_R6: 'Cuchilla Mangueras; Acrisol Ócrico Álbico Ar.',
        FACTOR_K: 0.29999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 60,
        SUELO_R6:
          'Cuchilla Mangueras; Argisol Dístrico Melánico, Abrúptico FrAr                                       ',
        FACTOR_K: 0.52000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 61,
        SUELO_R6: 'Cuchilla Santa Ana; Litosol Éutrico Melánico Fr r.',
        FACTOR_K: 0.40000000000000002,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 62,
        SUELO_R6:
          'Curtina; Litosol Éutrico Melánico                                                                   ',
        FACTOR_K: 0.28000000000000003,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 63,
        SUELO_R6:
          'Curtina; Vertisol Háplico Ac mp.                                                                    ',
        FACTOR_K: 0.10000000000000001,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 64,
        SUELO_R6:
          'Curtina; Vertisol Háplico Ac mp.                                                                    ',
        FACTOR_K: 0.13,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 65,
        SUELO_R6:
          'Curtina; Brunosol Éutrico Típico LAc mp., v.                                                        ',
        FACTOR_K: 0.20999999999999999,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 66,
        SUELO_R6:
          'Ecilda Paullier - Las Brujas; Brunosol Éutrico/Subéutrico Típico Fr                                 ',
        FACTOR_K: 0.23000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 67,
        SUELO_R6:
          'El Ceibo; Solonetz L pa.                                                                            ',
        FACTOR_K: 0.76000000000000001,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 68,
        SUELO_R6:
          'El Ceibo; Solonetz Solodizado Ócrico L pa.                                                          ',
        FACTOR_K: 0.88,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 69,
        SUELO_R6:
          'El Ceibo; Solod Melánico L pa.                                                                      ',
        FACTOR_K: 0.79000000000000004,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 70,
        SUELO_R6:
          'El Palmito; Brunosol Éutrico Típico LAc.                                                            ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 71,
        SUELO_R6:
          'Espinillar; Brunosol Éutrico Típico Fr.                                                             ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 72,
        SUELO_R6:
          'Frayle Muerto; Brunosol Éutrico Típico LAc v.                                                       ',
        FACTOR_K: 0.28000000000000003,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 73,
        SUELO_R6:
          'Fray Bentos; Brunosol Éutrico Típico LAc.                                                           ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 74,
        SUELO_R6:
          'India Muerta; Gleysol Háplico Melánico LAc                                                          ',
        FACTOR_K: 0.52000000000000002,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 75,
        SUELO_R6:
          'Isla Mala; Brunosol Éutrico Lúvico Fr.                                                              ',
        FACTOR_K: 0.34000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 76,
        SUELO_R6:
          'Isla Mala; Brunosol Éutrico Típico Fr.                                                              ',
        FACTOR_K: 0.23999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 77,
        SUELO_R6:
          'Isla Mala; Vertisol Rúptico Lúvico Fr                                                               ',
        FACTOR_K: 0.14999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 78,
        SUELO_R6:
          'Isla Mala; Vertisol Rúptico Lúvico Fr                                                               ',
        FACTOR_K: 0.22,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 79,
        SUELO_R6: 'Islas del Uruguay; Fluvisol Isotextural Ócrico L',
        FACTOR_K: 0.35999999999999999,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 80,
        SUELO_R6:
          'Itapebí - Tres Árboles; Brunosol Éutrico Típico LAc v.                                              ',
        FACTOR_K: 0.20999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 81,
        SUELO_R6:
          'Itapebí - Tres Árboles; Vertisol Háplico Ac.                                                        ',
        FACTOR_K: 0.10000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 82,
        SUELO_R6:
          'Itapebí - Tres Árboles; Vertisol Háplico Ac.                                                        ',
        FACTOR_K: 0.13,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 83,
        SUELO_R6:
          'José Pedro Varela; Brunosol Subéutrico Lúvico L                                                     ',
        FACTOR_K: 0.42999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 84,
        SUELO_R6:
          'José Pedro Varela; Argisol Subéutrico Melánico Abrúptico Fr.                                        ',
        FACTOR_K: 0.40000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 85,
        SUELO_R6:
          'Kiyú; Brunosol Subéutrico Típico LAc                                                                ',
        FACTOR_K: 0.31,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 86,
        SUELO_R6:
          'Kiyú; Planosol Subéutrico Melánico LAc.                                                             ',
        FACTOR_K: 0.34999999999999998,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 87,
        SUELO_R6:
          'La Carolina; Brunosol Éutrico Típico LAc v.                                                         ',
        FACTOR_K: 0.23999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 88,
        SUELO_R6:
          'La Carolina; Vertisol Rúptico Lúvico Fr                                                             ',
        FACTOR_K: 0.14999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 89,
        SUELO_R6:
          'La Carolina; Vertisol Rúptico Lúvico Fr                                                             ',
        FACTOR_K: 0.22,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 90,
        SUELO_R6:
          'La Charqueada; Planosol Subéutrico Ócrico Fr pa.                                                    ',
        FACTOR_K: 0.58999999999999997,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 91,
        SUELO_R6:
          'Laguna Merín; Gleysol Háplico Ócrico Ar.                                                            ',
        FACTOR_K: 0.65000000000000002,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 92,
        SUELO_R6:
          'Lascano; Planosol Subéutrico Melánico L. pa.                                                        ',
        FACTOR_K: 0.52000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 93,
        SUELO_R6:
          'Las Toscas; Luvisol Ócrico Abrúptico Ar r.                                                          ',
        FACTOR_K: 0.31,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 94,
        SUELO_R6:
          'Lechiguana; Brunosol Éutrico Típico LAc v.                                                          ',
        FACTOR_K: 0.27000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 95,
        SUELO_R6:
          'Lechiguana; Vertisol Rúptico Lúvico Ac                                                              ',
        FACTOR_K: 0.10000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 96,
        SUELO_R6: 'Lechiguana; Vertisol Ruptico Luvico Ac (Oto. e Inv.)',
        FACTOR_K: 0.14000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 97,
        SUELO_R6:
          'Libertad; Brunosol Éutrico Típico LAc.                                                              ',
        FACTOR_K: 0.31,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 98,
        SUELO_R6:
          'Los Mimbres; Brunosol Éutrico Típico ArAc.                                                          ',
        FACTOR_K: 0.17999999999999999,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 99,
        SUELO_R6:
          'Manuel Oribe; Brunosol Dístrico Lúvico ArFr.                                                        ',
        FACTOR_K: 0.48999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 100,
        SUELO_R6:
          'Manuel Oribe; Luvisol Melánico Abrúptico Ar                                                         ',
        FACTOR_K: 0.29999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 101,
        SUELO_R6: 'Masoller; Litosol Éutrico Melánico LAc.',
        FACTOR_K: 0.28000000000000003,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 102,
        SUELO_R6: 'Masoller; Vertisol Háplico Ac mp.  (Pri. y Ver.)',
        FACTOR_K: 0.10000000000000001,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 103,
        SUELO_R6: 'Masoller; Vertisol Háplico Ac mp. ',
        FACTOR_K: 0.13,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 104,
        SUELO_R6: 'Masoller; Brunosol Éutrico Típico LAc mp.v.',
        FACTOR_K: 0.20999999999999999,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 105,
        SUELO_R6:
          'Montecoral; Brunosol Subéutrico Lúvico Fr. sd.                                                      ',
        FACTOR_K: 0.45000000000000001,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 106,
        SUELO_R6:
          'Palleros; Brunosol Éutrico Típico Fr. v.                                                            ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 107,
        SUELO_R6:
          'Palleros; Vertisol Háplico LAc                                                                      ',
        FACTOR_K: 0.14999999999999999,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 108,
        SUELO_R6:
          'Palleros; Vertisol Háplico LAc                                                                      ',
        FACTOR_K: 0.19,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 109,
        SUELO_R6:
          'Paso Coelho; Vertisol Háplico LAc                                                                   ',
        FACTOR_K: 0.14000000000000001,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 110,
        SUELO_R6:
          'Paso Coelho; Vertisol Háplico LAc                                                                   ',
        FACTOR_K: 0.20999999999999999,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 111,
        SUELO_R6:
          'Paso Palmar; Brunosol Subéutrico Lúvico Fr                                                          ',
        FACTOR_K: 0.31,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 112,
        SUELO_R6:
          'Paso Palmar; Vertisol Rúptico Lúvico ArAc                                ',
        FACTOR_K: 0.10000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 113,
        SUELO_R6:
          'Paso Palmar; Vertisol Rúptico Lúvico ArAc                                                           ',
        FACTOR_K: 0.17000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 114,
        SUELO_R6:
          'Pueblo del Barro; Brunosol Éutrico Típico LAc v.                                                    ',
        FACTOR_K: 0.28000000000000003,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 115,
        SUELO_R6:
          'Puntas de Herrera; Brunosol Subéutrico Típico Fr                                                    ',
        FACTOR_K: 0.45000000000000001,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 116,
        SUELO_R6:
          'Queguay Chico; Litosol Éutrico Melánico LAc                                                         ',
        FACTOR_K: 0.26000000000000001,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 117,
        SUELO_R6:
          'Rincón de la Urbana; Vertisol Háplico LAc                                                           ',
        FACTOR_K: 0.14999999999999999,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 118,
        SUELO_R6:
          'Rincón de la Urbana; Vertisol Háplico LAc                                                           ',
        FACTOR_K: 0.17999999999999999,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 119,
        SUELO_R6:
          'Rincón de la Urbana; Argisol Subéutrico Melánico Abrúptico Fr                                       ',
        FACTOR_K: 0.45000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 120,
        SUELO_R6:
          'Rincón de Ramírez; Solonetz L pa.                                                                   ',
        FACTOR_K: 0.76000000000000001,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 121,
        SUELO_R6:
          'Rincón de Ramírez; Solonetz Solodizado Ócrico L pa.                                                 ',
        FACTOR_K: 0.77000000000000002,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 122,
        SUELO_R6:
          'Rincón de Ramírez; Solod Ócrico L pa.                                                               ',
        FACTOR_K: 0.79000000000000004,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 123,
        SUELO_R6:
          'Rincón de Zamora; Brunosol Subéutrico Típico Fr                                                     ',
        FACTOR_K: 0.39000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 124,
        SUELO_R6:
          'Rincón de Zamora; Brunosol Dístrico Lúvico ArFr                                                     ',
        FACTOR_K: 0.54000000000000004,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 125,
        SUELO_R6:
          'Río Branco; Planosol Dístrico Ócrico ArFr.                                                          ',
        FACTOR_K: 0.48999999999999999,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 126,
        SUELO_R6:
          'Río Tacuarembó; Gleysol Lúvico Melánico Típico Fr pa.                                               ',
        FACTOR_K: 0.44,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 127,
        SUELO_R6:
          'Río Tacuarembó; Planosol Dístrico Melánico Ar.                                                      ',
        FACTOR_K: 0.40000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 128,
        SUELO_R6:
          'Risso; Brunosol Éutrico Típico Fr.                                                                  ',
        FACTOR_K: 0.22,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 129,
        SUELO_R6:
          'Risso; Vertisol Rúptico Típico LAc                                                                  ',
        FACTOR_K: 0.14000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 130,
        SUELO_R6:
          'Risso; Vertisol Rúptico Típico LAc                                                                  ',
        FACTOR_K: 0.17000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 131,
        SUELO_R6:
          'Rivera; Acrisol Ócrico Típico Ar r.                                                                 ',
        FACTOR_K: 0.22,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 132,
        SUELO_R6:
          'Salto; Acrisol Dístrico Ócrico Ar.                                                                  ',
        FACTOR_K: 0.14999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 133,
        SUELO_R6:
          'San Carlos; Argisol Subéutrico Melánico Fr                                                          ',
        FACTOR_K: 0.56000000000000005,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 134,
        SUELO_R6:
          'San Gabriel - Guaycurú; Brunosol Subéutrico Háplico Fr s                                            ',
        FACTOR_K: 0.40000000000000002,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 135,
        SUELO_R6:
          'San Jacinto; Brunosol Éutrico LAc                                                                   ',
        FACTOR_K: 0.27000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 136,
        SUELO_R6: 'San Jacinto; Vertisol Rúptico Lúvico LAc (Pri. y Ver.)',
        FACTOR_K: 0.22,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 137,
        SUELO_R6:
          'San Jacinto; Vertisol Rúptico Lúvico LAc                                                            ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 138,
        SUELO_R6:
          'San Jorge; Argisol Dístrico Ócrico Abrúptico Ar.                                                    ',
        FACTOR_K: 0.23000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 139,
        SUELO_R6:
          'San Luís; Gleysol Lúvico Melánico Típico L pa.                                                      ',
        FACTOR_K: 0.5,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 140,
        SUELO_R6:
          'San Manuel; Brunosol Éutrico Típico Fr                                                              ',
        FACTOR_K: 0.17999999999999999,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 141,
        SUELO_R6:
          'San Ramón; Planosol Éutrico Melánico LAc                                                            ',
        FACTOR_K: 0.40000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 142,
        SUELO_R6:
          'Santa Clara; Brunosol Subéutrico Háplico FrGv mp.                                                   ',
        FACTOR_K: 0.20999999999999999,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 143,
        SUELO_R6:
          'Sarandí de Tejera; Brunosol Subéutrico Típico Fr                                                    ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 144,
        SUELO_R6:
          'Sarandí de Tejera; Litosol Subéutrico Melánico FrGv                                                 ',
        FACTOR_K: 0.31,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 145,
        SUELO_R6: 'Sierra de Aiguá; Litosol Subéutrico Melánico ArFrGv',
        FACTOR_K: 0.32000000000000001,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 146,
        SUELO_R6:
          'Sierra de Animas; Inceptisol Úmbrico Fr. mp., pd.                                                   ',
        FACTOR_K: 0.35999999999999999,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 147,
        SUELO_R6:
          'Sierra  Polanco; Brunosol Subéutrico Háplico Fr s.                                                ',
        FACTOR_K: 0.53000000000000003,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 148,
        SUELO_R6:
          'Sierra  Polanco; Brunosol Subéutrico Típico Fr                                                    ',
        FACTOR_K: 0.23000000000000001,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 149,
        SUELO_R6:
          'Sierra de Mahoma; Brunosol Subeutrico Haplico ArGv                                                  ',
        FACTOR_K: 0.20999999999999999,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 150,
        SUELO_R6:
          'Tacuarembó; Luvisol Ócrico Abrúptico Ar                                                             ',
        FACTOR_K: 0.38,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 151,
        SUELO_R6:
          'Tacuarembo; Acrisol Ocrico Abruptico Ar                                                             ',
        FACTOR_K: 0.34000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 152,
        SUELO_R6:
          'Tala - Rodríguez; Brunosol Éutrico Típico LAc                                                       ',
        FACTOR_K: 0.27000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 153,
        SUELO_R6:
          'Tala - Rodríguez; Vertisol Rúptico LAc                                        ',
        FACTOR_K: 0.22,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 154,
        SUELO_R6:
          'Tala - Rodríguez; Vertisol Rúptico LAc                                        ',
        FACTOR_K: 0.23999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 155,
        SUELO_R6:
          'Toledo; Brunosol Éutrico Típico LAc                                                                 ',
        FACTOR_K: 0.39000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 156,
        SUELO_R6:
          'Tres Bocas; Argisol Dístrico Ócrico Ar                                                              ',
        FACTOR_K: 0.14999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 157,
        SUELO_R6: 'Tres Cerros; Luvisol Ócrico Típico Ar',
        FACTOR_K: 0.39000000000000001,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 158,
        SUELO_R6:
          'Tres Cerros; Acrisol Ócrico Típico Ar                                                               ',
        FACTOR_K: 0.22,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 159,
        SUELO_R6:
          'Tres Islas; Luvisol Ócrico Típico Ar r.                                                             ',
        FACTOR_K: 0.51000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 160,
        SUELO_R6:
          'Tres Puentes; Brunosol Subéutrico Háplico Fr s.                                                     ',
        FACTOR_K: 0.40999999999999998,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 161,
        SUELO_R6:
          'Tres Puentes; Brunosol Subéutrico Típico Fr                                                         ',
        FACTOR_K: 0.47999999999999998,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 162,
        SUELO_R6:
          'Trinidad; Brunosol Éutrico Típico ArAc v.                                                           ',
        FACTOR_K: 0.23000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 163,
        SUELO_R6:
          'Trinidad; Vertisol Rúptico Lúvico ArAc                                                              ',
        FACTOR_K: 0.17000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 164,
        SUELO_R6:
          'Trinidad; Vertisol Rúptico Lúvico ArAc                                                              ',
        FACTOR_K: 0.20999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 165,
        SUELO_R6:
          'Valle Aiguá; Brunosol Subéutrico Típico LAc                                                         ',
        FACTOR_K: 0.39000000000000001,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 166,
        SUELO_R6: 'Valle Fuente; Brunosol Éutrico Típico LAc',
        FACTOR_K: 0.23999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 167,
        SUELO_R6:
          'Vergara; Argisol Subéutrico Melánico Fr. h.                                                         ',
        FACTOR_K: 0.5,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 168,
        SUELO_R6:
          'Vergara; Planosol Dístrico Ócrico Fr h.                                                             ',
        FACTOR_K: 0.52000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 169,
        SUELO_R6:
          'Villa Soriano; Gleysol Háplico Melánico LAc pa.                                                     ',
        FACTOR_K: 0.5,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 170,
        SUELO_R6:
          'Villa Soriano; Fluvisol Heterotextural Melánico h.                                                  ',
        FACTOR_K: 0.26000000000000001,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 171,
        SUELO_R6:
          'Villa Soriano; Vertisol Háplico LAc h.                                                              ',
        FACTOR_K: 0.10000000000000001,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 172,
        SUELO_R6:
          'Villa Soriano; Vertisol Háplico LAc h.                                                              ',
        FACTOR_K: 0.13,
        T: 9
      }
    },
    {
      attributes: {
        CODIGO: 173,
        SUELO_R6: 'Yí; Inceptisol Ócrico Gv s.',
        FACTOR_K: 0.31,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 174,
        SUELO_R6:
          'Yí; Brunosol Dístrico Lúvico ArFr                                                                   ',
        FACTOR_K: 0.37,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 175,
        SUELO_R6:
          'Young; Brunosol Éutrico Típico Fr.                                                                  ',
        FACTOR_K: 0.19,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 176,
        SUELO_R6:
          'Zapallar; Luvisol Melánico Álbico Ar                                                                ',
        FACTOR_K: 0.47999999999999998,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 177,
        SUELO_R6: 'Zapicán; Brunosol Subéutrico Típico LAc',
        FACTOR_K: 0.40000000000000002,
        T: 5
      }
    },
    {
      attributes: {
        CODIGO: 178,
        SUELO_R6: 'Zapicán; Argisol Éutrico Melánico L',
        FACTOR_K: 0.5,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 179,
        SUELO_R6:
          'Cuaró; Vertisol Háplico Ac                                                                          ',
        FACTOR_K: 0.10000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 180,
        SUELO_R6:
          'Arapey; Vertisol Háplico Ac                                                                         ',
        FACTOR_K: 0.13,
        T: 12
      }
    },
    {
      attributes: {
        CODIGO: 181,
        SUELO_R6:
          'Arroyo Blanco; Brunosol Subéutrico Típico Fr. mp.                                                   ',
        FACTOR_K: 0.53000000000000003,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 182,
        SUELO_R6:
          'Carpintería; Vertisol Rúptico Lúvico ArAc                                                           ',
        FACTOR_K: 0.16,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 183,
        SUELO_R6:
          'Ecilda Paullier - Las Brujas; Brunosol Éutrico/Subéutrico Típico Fr                                 ',
        FACTOR_K: 0.27000000000000002,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 184,
        SUELO_R6:
          'La Carolina; Brunosol Éutrico Típico LAc v.                                                         ',
        FACTOR_K: 0.29999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 185,
        SUELO_R6:
          'La Carolina; Vertisol Rúptico Lúvico Fr                                                             ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 186,
        SUELO_R6:
          'Lascano; Planosol Subéutrico Melánico L. pa.                                                        ',
        FACTOR_K: 0.48999999999999999,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 187,
        SUELO_R6: 'Lechiguana; Vertisol Rúptico Lúvico Ac',
        FACTOR_K: 0.14000000000000001,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 188,
        SUELO_R6:
          'Libertad; Brunosol Éutrico Típico LAc.                                                              ',
        FACTOR_K: 0.37,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 189,
        SUELO_R6:
          'San Gabriel - Guaycurú; Brunosol Subéutrico Háplico Fr s                                            ',
        FACTOR_K: 0.40000000000000002,
        T: 2
      }
    },
    {
      attributes: {
        CODIGO: 190,
        SUELO_R6:
          'Tala - Rodríguez; Brunosol Éutrico Típico LAc                                                       ',
        FACTOR_K: 0.28000000000000003,
        T: 7
      }
    },
    {
      attributes: {
        CODIGO: 191,
        SUELO_R6:
          'Tala - Rodríguez; Vertisol Rúptico LAc                                        ',
        FACTOR_K: 0.26000000000000001,
        T: 7
      }
    }
  ]
};

export function metaToSuelosCore(
  features: SueloCoreMetaFeature[]
): SueloCore[] {
  return features.map(f => ({
    sueloId: f.attributes.CODIGO.toString(),
    sueloDesc: f.attributes.SUELO_R6,
    sueloFactorK: f.attributes.FACTOR_K,
    sueloTolerancia: f.attributes.T,
    sueloSlopeMin: null,
    sueloSlopeMax: null
  }));
}
