import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  Plus, 
  Search,
  Edit,
  Trash2,
  Tag,
  Radio,
  Monitor,
  Bookmark
} from 'lucide-react';
import { 
  mockClientes, 
  mockRubros, 
  mockMedios, 
  mockSoportes, 
  mockMarcas 
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AccesoItem {
  id: number;
  clienteId: number;
  tipo: 'rubro' | 'medio' | 'soporte' | 'marca';
  itemId: number;
  multimedia: boolean;
  activo: boolean;
  fechaCreacion: Date;
}

const AccesosControl = () => {
  const [selectedCliente, setSelectedCliente] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('rubros');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { toast } = useToast();

  // Mock data for access controls
  const [accesos, setAccesos] = useState<AccesoItem[]>([
    { id: 1, clienteId: 1, tipo: 'rubro', itemId: 1, multimedia: true, activo: true, fechaCreacion: new Date() },
    { id: 2, clienteId: 1, tipo: 'rubro', itemId: 2, multimedia: false, activo: true, fechaCreacion: new Date() },
    { id: 3, clienteId: 2, tipo: 'medio', itemId: 1, multimedia: true, activo: true, fechaCreacion: new Date() },
    { id: 4, clienteId: 2, tipo: 'medio', itemId: 4, multimedia: true, activo: true, fechaCreacion: new Date() },
    { id: 5, clienteId: 1, tipo: 'soporte', itemId: 1, multimedia: false, activo: true, fechaCreacion: new Date() },
    { id: 6, clienteId: 3, tipo: 'marca', itemId: 1, multimedia: true, activo: false, fechaCreacion: new Date() },
  ]);

  const getClienteName = (clienteId: number) => {
    const cliente = mockClientes.find(c => c.id === clienteId);
    return cliente?.nombre || 'Cliente no encontrado';
  };

  const getItemName = (tipo: string, itemId: number) => {
    switch (tipo) {
      case 'rubro':
        return mockRubros.find(r => r.id === itemId)?.nombre || 'Rubro no encontrado';
      case 'medio':
        return mockMedios.find(m => m.id === itemId)?.nombre || 'Medio no encontrado';
      case 'soporte':
        return mockSoportes.find(s => s.id === itemId)?.nombre || 'Soporte no encontrado';
      case 'marca':
        return mockMarcas.find(m => m.id === itemId)?.nombre || 'Marca no encontrada';
      default:
        return 'Desconocido';
    }
  };

  const filteredAccesos = accesos.filter(acceso => {
    const matchesCliente = !selectedCliente || acceso.clienteId.toString() === selectedCliente;
    const matchesSearch = !searchTerm || 
      getItemName(acceso.tipo, acceso.itemId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getClienteName(acceso.clienteId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = acceso.tipo === activeTab.slice(0, -1); // Remove 's' from tab name
    
    return matchesCliente && matchesSearch && matchesTab;
  });

  const handleDelete = (id: number) => {
    setAccesos(accesos.filter(a => a.id !== id));
    toast({
      title: "Acceso eliminado",
      description: "El acceso ha sido eliminado exitosamente.",
    });
  };

  const handleToggleActive = (id: number) => {
    setAccesos(accesos.map(a => 
      a.id === id ? { ...a, activo: !a.activo } : a
    ));
    toast({
      title: "Acceso actualizado",
      description: "El estado del acceso ha sido cambiado.",
    });
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'rubros': return <Tag className="h-4 w-4" />;
      case 'medios': return <Radio className="h-4 w-4" />;
      case 'soportes': return <Monitor className="h-4 w-4" />;
      case 'marcas': return <Bookmark className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getItemsForType = (tipo: string) => {
    switch (tipo) {
      case 'rubro': return mockRubros;
      case 'medio': return mockMedios;
      case 'soporte': return mockSoportes;
      case 'marca': return mockMarcas;
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Control de Accesos
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Gestiona los accesos por cliente a rubros, medios, soportes y marcas
              </p>
            </div>
            <Button onClick={() => setIsCreateOpen(true)} className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Acceso
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCliente} onValueChange={setSelectedCliente}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filtrar por cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los clientes</SelectItem>
                {mockClientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id.toString()}>
                    {cliente.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {accesos.filter(a => a.tipo === 'rubro').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Accesos Rubros</p>
                  </div>
                  <Tag className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-success">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-success">
                      {accesos.filter(a => a.tipo === 'medio').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Accesos Medios</p>
                  </div>
                  <Radio className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-warning">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-warning">
                      {accesos.filter(a => a.tipo === 'soporte').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Accesos Soportes</p>
                  </div>
                  <Monitor className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-accent-foreground">
                      {accesos.filter(a => a.tipo === 'marca').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Accesos Marcas</p>
                  </div>
                  <Bookmark className="h-8 w-8 text-accent-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different access types */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rubros" className="flex items-center gap-2">
                {getTabIcon('rubros')}
                Rubros
              </TabsTrigger>
              <TabsTrigger value="medios" className="flex items-center gap-2">
                {getTabIcon('medios')}
                Medios
              </TabsTrigger>
              <TabsTrigger value="soportes" className="flex items-center gap-2">
                {getTabIcon('soportes')}
                Soportes
              </TabsTrigger>
              <TabsTrigger value="marcas" className="flex items-center gap-2">
                {getTabIcon('marcas')}
                Marcas
              </TabsTrigger>
            </TabsList>

            {['rubros', 'medios', 'soportes', 'marcas'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>
                          {tab.charAt(0).toUpperCase() + tab.slice(1, -1)}
                        </TableHead>
                        <TableHead>Multimedia</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha Creación</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAccesos.map((acceso) => (
                        <TableRow key={acceso.id}>
                          <TableCell>
                            <Badge variant="outline">
                              {getClienteName(acceso.clienteId)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {getItemName(acceso.tipo, acceso.itemId)}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={acceso.multimedia ? "default" : "secondary"}
                              className={acceso.multimedia ? "bg-primary" : ""}
                            >
                              {acceso.multimedia ? 'Sí' : 'No'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(acceso.id)}
                            >
                              <Badge 
                                variant={acceso.activo ? "default" : "destructive"}
                                className={acceso.activo ? "bg-success" : ""}
                              >
                                {acceso.activo ? 'Activo' : 'Inactivo'}
                              </Badge>
                            </Button>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Intl.DateTimeFormat('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }).format(acceso.fechaCreacion)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(acceso.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredAccesos.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No se encontraron accesos para {tab}.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Create Access Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Acceso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {mockClientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id.toString()}>
                      {cliente.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Acceso</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rubro">Rubro</SelectItem>
                  <SelectItem value="medio">Medio</SelectItem>
                  <SelectItem value="soporte">Soporte</SelectItem>
                  <SelectItem value="marca">Marca</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item">Elemento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar elemento" />
                </SelectTrigger>
                <SelectContent>
                  {/* Dynamic options based on selected type */}
                  <SelectItem value="1">Elemento 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="multimedia" />
              <Label htmlFor="multimedia">Acceso Multimedia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="activo" defaultChecked />
              <Label htmlFor="activo">Acceso Activo</Label>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Acceso creado",
                  description: "El nuevo acceso ha sido creado exitosamente.",
                });
                setIsCreateOpen(false);
              }}>
                Crear
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccesosControl;