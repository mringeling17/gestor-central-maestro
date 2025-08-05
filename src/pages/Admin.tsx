import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ClientesList from '@/components/admin/ClientesList';
import UsuariosList from '@/components/admin/UsuariosList';
import AccesosControl from '@/components/admin/AccesosControl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Users, Building2, Shield } from 'lucide-react';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('clientes');

  const renderContent = () => {
    switch (activeSection) {
      case 'clientes':
        return <ClientesList />;
      case 'usuarios':
        return <UsuariosList />;
      case 'accesos':
        return <AccesosControl />;
      case 'base-datos':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <Database className="mr-3 h-6 w-6" />
                Estructura de Base de Datos
              </CardTitle>
              <p className="text-muted-foreground">
                Información sobre la estructura de la base de datos del sistema
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-primary">Cliente</div>
                        <p className="text-sm text-muted-foreground">Entidad principal</p>
                      </div>
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-success">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-success">Usuario</div>
                        <p className="text-sm text-muted-foreground">Usuarios por cliente</p>
                      </div>
                      <Users className="h-6 w-6 text-success" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-warning">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-warning">Accesos</div>
                        <p className="text-sm text-muted-foreground">Control de permisos</p>
                      </div>
                      <Shield className="h-6 w-6 text-warning" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Entidades del Sistema</h3>
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Entidades Principales</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Cliente - Empresas que utilizan el sistema</li>
                      <li>• Usuario - Usuarios asociados a cada cliente</li>
                      <li>• Cargo - Roles y posiciones de usuarios</li>
                      <li>• Sistema - Configuración de sistemas disponibles</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Entidades de Contenido</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Rubro - Categorías de industrias</li>
                      <li>• Medio - Tipos de medios de comunicación</li>
                      <li>• Soporte - Canales específicos de medios</li>
                      <li>• Marca - Marcas monitoreadas</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Entidades de Control</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Acceso - Control general de accesos</li>
                      <li>• AccesoRubro - Permisos específicos por rubro</li>
                      <li>• AccesoMedio - Permisos específicos por medio</li>
                      <li>• AccesoSoporte - Permisos específicos por soporte</li>
                      <li>• FiltroMarcasClientes - Filtros de marcas por cliente</li>
                      <li>• FiltroRubroClientes - Filtros de rubros por cliente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <ClientesList />;
    }
  };

  return (
    <AdminLayout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;