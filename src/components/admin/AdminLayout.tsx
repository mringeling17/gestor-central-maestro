import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Building2, Shield, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminLayout = ({ children, activeSection, onSectionChange }: AdminLayoutProps) => {
  const sections = [
    { id: 'clientes', label: 'Administración de Clientes', icon: Building2 },
    { id: 'usuarios', label: 'Administración de Usuarios', icon: Users },
    { id: 'accesos', label: 'Control de Accesos', icon: Shield },
    { id: 'base-datos', label: 'Base de Datos', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-primary-foreground/80 mt-2">
            Gestión integral del sistema de clientes y accesos
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Navegación</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        activeSection === section.id 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => onSectionChange(section.id)}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {section.label}
                    </Button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;