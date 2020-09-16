export enum DibujoCoreType {
  POLYGON = 'polygon',
  POLYLINE = 'polyline'
}

export interface DibujoCore {
  dibujoId: number;
  dibujoGeometria: string;
  dibujoTipo: DibujoCoreType;
}

export function geometryTypeToDibujoCoreType(t: string): DibujoCoreType {
  switch (t) {
    case 'polygon':
      return DibujoCoreType.POLYGON;
    case 'polyline':
      return DibujoCoreType.POLYLINE;
  }
  return null;
}

export function dibujoCoreTypeToGeometryType(t: DibujoCoreType): string {
  switch (t) {
    case DibujoCoreType.POLYGON:
      return 'polygon';
    case DibujoCoreType.POLYLINE:
      return 'polyline';
  }
  return null;
}
