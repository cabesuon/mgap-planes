import esri = __esri;

export const OBJECTID = 'objectId';

export interface MapProperties {
  basemap: string;
}

export interface MapViewProperties {
  center: [number, number];
  zoom: number;
}

export interface FeatureLayerProperties {
  fields: { name: string; alias: string; type: string }[];
  objectIdField: string;
  geometryType: string;
  spatialReference: { wkid: number };
  renderer: { type: string; symbol: Object };
  labelingInfo?: {
    labelExpressionInfo: { expression: string };
    symbol: Object;
  };
  popupTemplate: { title: string; outFields?: string[]; content?: Object[] };
}

// chacras

export const chacrasSymbols = {
  fill: {
    type: 'simple-fill',
    color: [0, 0, 0, 0.1],
    style: 'solid',
    outline: {
      type: 'simple-line',
      color: 'black',
      width: '1px'
    }
  },
  text: {
    type: 'text',
    color: 'white',
    haloColor: 'black',
    haloSize: '1px',
    text: '',
    font: {
      family: 'Roboto Condensed',
      style: 'italic',
      weight: 'normal',
      size: 14
    }
  }
};

export const chacrasFeatureLayerProperties: FeatureLayerProperties = {
  objectIdField: OBJECTID,
  geometryType: 'polygon',
  spatialReference: { wkid: 4326 },
  fields: [
    {
      name: 'ChacraDesvioFactorK',
      alias: 'ChacraDesvioFactorK',
      type: 'double'
    },
    {
      name: 'ChacraDesvioFactorLS',
      alias: 'ChacraDesvioFactorLS',
      type: 'double'
    },
    {
      name: 'ChacraDesvioFactorR',
      alias: 'ChacraDesvioFactorR',
      type: 'double'
    },
    {
      name: 'ChacraDesvioFactorA',
      alias: 'ChacraDesvioFactorA',
      type: 'double'
    },
    { name: 'ChacraDicose', alias: 'ChacraDicose', type: 'integer' },
    {
      name: 'ChacraFactorLAsignado',
      alias: 'ChacraFactorLAsignado',
      type: 'double'
    },
    {
      name: 'ChacraFactorSAsignado',
      alias: 'ChacraFactorSAsignado',
      type: 'double'
    },
    {
      name: 'ChacraFactorLLimitante',
      alias: 'ChacraFactorLLimitante',
      type: 'double'
    },
    {
      name: 'ChacraFactorSLimitante',
      alias: 'ChacraFactorSLimitante',
      type: 'double'
    },
    {
      name: 'ChacraFactorRAsignado',
      alias: 'ChacraFactorRAsignado',
      type: 'double'
    },
    { name: 'ChacraFactorC', alias: 'ChacraFactorC', type: 'double' },
    {
      name: 'ChacraFactorRAutomatico',
      alias: 'ChacraFactorRAutomatico',
      type: 'double'
    },
    {
      name: 'ChacraFactorLSEsManual',
      alias: 'ChacraFactorLSEsManual',
      type: 'string'
    },
    {
      name: 'ChacraFactorLSAsignado',
      alias: 'ChacraFactorLSAsignado',
      type: 'double'
    },
    {
      name: 'ChacraFactorLSLimitante',
      alias: 'ChacraFactorLSLimitante',
      type: 'double'
    },
    {
      name: 'ChacraFactorAAsignado',
      alias: 'ChacraFactorAAsignado',
      type: 'double'
    },
    {
      name: 'ChacraFactorALimitante',
      alias: 'ChacraFactorALimitante',
      type: 'double'
    },
    { name: 'ChacraFactorP', alias: 'ChacraFactorP', type: 'double' },
    {
      name: 'ChacraFactorPEsManual',
      alias: 'ChacraFactorPEsManual',
      type: 'string'
    },
    { name: 'ChacraGDBId', alias: 'ChacraGDBId', type: 'integer' },
    { name: 'ChacraId', alias: 'ChacraId', type: 'integer' },
    {
      name: 'ChacraLargoAsignado',
      alias: 'ChacraLargoAsignado',
      type: 'double'
    },
    {
      name: 'ChacraLargoLimitante',
      alias: 'ChacraLargoLimitante',
      type: 'double'
    },
    { name: 'ChacraNro', alias: 'ChacraNro', type: 'integer' },
    { name: 'ChacraNombre', alias: 'ChacraNombre', type: 'string' },
    { name: 'ChacraLocalidad', alias: 'ChacraLocalidad', type: 'string' },
    { name: 'ChacraPadreNro', alias: 'ChacraPadreNro', type: 'integer' },
    {
      name: 'ChacraPendienteAsignado',
      alias: 'ChacraPendienteAsignado',
      type: 'double'
    },
    {
      name: 'ChacraPendienteLimitante',
      alias: 'ChacraPendienteLimitante',
      type: 'double'
    },
    {
      name: 'ChacraSueloLimitanteFactorK',
      alias: 'ChacraSueloLimitanteFactorK',
      type: 'double'
    },
    {
      name: 'ChacraSueloAsignadoId',
      alias: 'ChacraSueloAsignadoId',
      type: 'integer'
    },
    {
      name: 'ChacraSueloLimitanteId',
      alias: 'ChacraSueloLimitanteId',
      type: 'integer'
    },
    {
      name: 'ChacraSueloAsignadoDsc',
      alias: 'ChacraSueloAsignadoDsc',
      type: 'string'
    },
    {
      name: 'ChacraSueloAsignadoFactorK',
      alias: 'ChacraSueloAsignadoFactorK',
      type: 'double'
    },
    {
      name: 'ChacraSueloAsignadoTolerancia',
      alias: 'ChacraSueloAsignadoTolerancia',
      type: 'double'
    },
    {
      name: 'ChacraSueloLimitanteDsc',
      alias: 'ChacraSueloLimitanteDsc',
      type: 'string'
    },
    {
      name: 'ChacraSueloLimitanteTolerancia',
      alias: 'ChacraSueloLimitanteTolerancia',
      type: 'double'
    },
    {
      name: 'ChacraSueloAsignadoSlopeMax',
      alias: 'ChacraSueloAsignadoSlopeMax',
      type: 'double'
    },
    {
      name: 'ChacraSueloAsignadoSlopeMin',
      alias: 'ChacraSueloAsignadoSlopeMin',
      type: 'double'
    },
    {
      name: 'ChacraSueloLimitanteSlopeMax',
      alias: 'ChacraSueloLimitanteSlopeMax',
      type: 'double'
    },
    {
      name: 'ChacraSueloLimitanteSlopeMin',
      alias: 'ChacraSueloLimitanteSlopeMin',
      type: 'double'
    },
    {
      name: 'ChacraTerrazasLargo',
      alias: 'ChacraTerrazasLargo',
      type: 'double'
    },
    {
      name: 'ChacraTerrazasConstruidas',
      alias: 'ChacraTerrazasConstruidas',
      type: 'string'
    },
    {
      name: 'ChacraVigenciaDesde',
      alias: 'ChacraVigenciaDesde',
      type: 'date'
    },
    {
      name: 'ChacraVigenciaHasta',
      alias: 'ChacraVigenciaHasta',
      type: 'date'
    },
    {
      name: 'MecanicaDeApoyoId',
      alias: 'MecanicaDeApoyoId',
      type: 'integer'
    },
    { name: 'PlanId', alias: 'PlanId', type: 'integer' },
    { name: 'RotacionId', alias: 'RotacionId', type: 'integer' }
  ],
  renderer: {
    type: 'simple',
    symbol: chacrasSymbols.fill
  },
  labelingInfo: {
    symbol: chacrasSymbols.text,
    labelExpressionInfo: {
      expression: '$feature.ChacraNombre'
    }
  },
  popupTemplate: {
    title: '{ChacraNombre}',
    content: [
      {
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'PlanId',
            label: 'Plan Id'
          },
          {
            fieldName: 'ChacraId',
            label: 'Chacra Id'
          },
          {
            fieldName: 'ChacraNro',
            label: 'Chacra Nro'
          },
          {
            fieldName: 'ChacraSueloLimitanteId',
            label: 'Suelo Id'
          },
          {
            fieldName: 'ChacraDicose',
            label: 'DICOSE'
          },
          {
            fieldName: 'ChacraFactorLSEsManual',
            label: 'Pendiente Manual'
          }
        ]
      }
    ]
  }
};

// pendientes

export const pendientesSymbols = {
  line: {
    type: 'simple-line',
    color: 'red',
    width: '1px',
    style: 'short-dot'
  }
};

export const pendientesFeatureLayerProperties: FeatureLayerProperties = {
  objectIdField: OBJECTID,
  geometryType: 'polyline',
  spatialReference: { wkid: 4326 },
  fields: [
    { name: 'ChacraId', alias: 'ChacraId', type: 'integer' },
    {
      name: 'ChacraFactorLSEsManual',
      alias: 'ChacraFactorLSEsManual',
      type: 'string'
    }
  ],
  renderer: {
    type: 'simple',
    symbol: pendientesSymbols.line
  },
  popupTemplate: {
    title: 'Pendiente:{ChacraFactorLSEsManual} Chacra:{ChacraId}',
    outFields: ['*']
  }
};

// zonas

export const zonasSymbols = {
  fill: {
    type: 'simple-fill',
    color: [255, 100, 0, 0.1],
    style: 'solid',
    outline: {
      type: 'simple-line',
      color: 'orange',
      width: '1px'
    }
  }
};

export const zonasFeatureLayerProperties: FeatureLayerProperties = {
  objectIdField: OBJECTID,
  geometryType: 'polygon',
  spatialReference: { wkid: 4326 },
  fields: [
    {
      name: 'ZonaExclusionId',
      alias: 'ZonaExclusionId',
      type: 'integer'
    },
    { name: 'ChacraId', alias: 'ChacraId', type: 'integer' }
  ],
  renderer: {
    type: 'simple',
    symbol: zonasSymbols.fill
  },
  popupTemplate: {
    title: 'Zona Exclusion:{ZonaExclusionId} Chacra:{ChacraId}',
    outFields: ['*']
  }
};

// dibujos

export const dibujosSymbols = {
  fill: {
    type: 'simple-fill',
    color: [0, 0, 255, 0.1],
    style: 'none',
    outline: {
      type: 'simple-line',
      color: 'blue',
      width: '1px'
    }
  },
  line: {
    type: 'simple-line',
    color: 'blue',
    width: '1px',
    style: 'short-dot'
  },
  marker: {
    type: 'simple-marker',
    outline: { width: '1px', color: [255, 255, 255, 0.99] },
    color: 'blue'
  },
  text: {
    type: 'text',
    color: 'white',
    haloColor: 'black',
    haloSize: '1px',
    text: '',
    font: {
      family: 'Roboto Condensed',
      style: 'italic',
      weight: 'normal',
      size: 14
    }
  }
};

export const circleSymbols = {
  line: {
    type: 'simple-line',
    style: 'dash',
    width: 1,
    color: [0, 255, 255, 1]
  },
  marker: {
    type: 'simple-marker',
    outline: { width: 1.5, color: [255, 255, 255, 0.99] },
    color: [0, 255, 255, 0.5]
  },
  text: {
    type: 'text',
    color: 'cyan',
    haloColor: 'black',
    haloSize: '1px',
    text: '',
    font: {
      family: 'Roboto Condensed',
      style: 'italic',
      weight: 'normal',
      size: 14
    }
  }
};
