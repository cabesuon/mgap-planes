import { ContactoCore } from '../contacto-core/contacto-core.model';

export interface EmpresaCore {
  empresaId: string;
  tipoSocialId: string;
  empresaPersonaCi: string;
  empresaRazonSocial: string;
  empresaRut: string;
  contactos: ContactoCore[];
}

export function createBaseEmpresaCore(
  empresaId: string,
  contactos: ContactoCore[]
): EmpresaCore {
  return {
    empresaId: `${empresaId}`,
    tipoSocialId: `Tipo social ${empresaId}`,
    empresaPersonaCi: `CI ${empresaId}`,
    empresaRut: `RUT ${empresaId}`,
    empresaRazonSocial: `Razon social ${empresaId}`,
    contactos
  };
}

export function nameEmpresaCore(empresa: EmpresaCore): string {
  return `${empresa.empresaRazonSocial}`;
}

export function personaRelEmpresaCore(
  empresa: EmpresaCore,
  personaId: string
): boolean {
  return !!empresa.contactos.find(c => c.personaId === personaId);
}

export function numberEmpresaCore(empresa: EmpresaCore): string {
  return empresa.empresaRut
    ? `RUT ${empresa.empresaRut}`
    : empresa.empresaPersonaCi
    ? `CI ${empresa.empresaPersonaCi}`
    : '';
}

export interface EmpresasCoreQueryResults {
  success: boolean;
  error: { code: number; description: string };
  empresas: EmpresaCore[];
}
