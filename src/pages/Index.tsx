import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Building2, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Sistema de Administración de Clientes
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Gestiona integralmente tus clientes, usuarios y controles de acceso 
              con una interfaz moderna y eficiente
            </p>
            <Link to="/admin">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Acceder al Panel
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Funcionalidades Principales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una plataforma completa para la gestión de clientes y control de accesos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Administración de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Crea, edita y gestiona todos los clientes del sistema con información detallada
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-success" />
              </div>
              <CardTitle>Gestión de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Administra usuarios por cliente con roles y permisos específicos
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-warning" />
              </div>
              <CardTitle>Control de Accesos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gestiona accesos granulares a rubros, medios, soportes y marcas
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>Base de Datos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Estructura robusta que mantiene la integridad de todos los datos
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link to="/admin">
            <Button size="lg" className="bg-primary hover:bg-primary-hover">
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
