import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Calendar,
  Key
} from 'lucide-react';
import { mockClientes } from '@/data/mockData';
import { Cliente } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

const ClientesList = () => {
  const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { toast } = useToast();

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.tipoCliente_Codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setClientes(clientes.filter(c => c.id !== id));
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado exitosamente.",
    });
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsEditOpen(true);
  };

  const handleCreate = () => {
    setSelectedCliente(null);
    setIsCreateOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Administración de Clientes
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Gestiona todos los clientes del sistema
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-primary hover:bg-primary-hover">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Search Bar */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes por nombre o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">
                {clientes.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Clientes</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-success">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {clientes.filter(c => c.activo).length}
              </div>
              <p className="text-sm text-muted-foreground">Activos</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">
                {clientes.filter(c => !c.activo).length}
              </div>
              <p className="text-sm text-muted-foreground">Inactivos</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Todos los Rubros</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Última Actualización</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">
                    {cliente.nombre}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{cliente.tipoCliente_Codigo}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={cliente.activo ? "default" : "destructive"}
                      className={cliente.activo ? "bg-success" : ""}
                    >
                      {cliente.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={cliente.allRubros ? "default" : "secondary"}
                      className={cliente.allRubros ? "bg-primary" : ""}
                    >
                      {cliente.allRubros ? 'Sí' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(cliente.fechaHorCreacion)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(cliente.fechaUpdacion)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(cliente)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(cliente.id)}
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

        {filteredClientes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No se encontraron clientes.</p>
          </div>
        )}
      </CardContent>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setSelectedCliente(null);
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isCreateOpen ? 'Crear Nuevo Cliente' : 'Editar Cliente'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Cliente</Label>
              <Input
                id="nombre"
                placeholder="Ingrese el nombre del cliente"
                defaultValue={selectedCliente?.nombre || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Cliente</Label>
              <Input
                id="tipo"
                placeholder="Ej: CORP, BANK, RETAIL"
                defaultValue={selectedCliente?.tipoCliente_Codigo || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apikey">API Key</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="apikey"
                  placeholder="API Key del cliente"
                  className="pl-10"
                  defaultValue={selectedCliente?.apiKey || ''}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="activo"
                defaultChecked={selectedCliente?.activo ?? true}
              />
              <Label htmlFor="activo">Cliente Activo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allrubros"
                defaultChecked={selectedCliente?.allRubros ?? false}
              />
              <Label htmlFor="allrubros">Acceso a Todos los Rubros</Label>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
              }}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast({
                  title: isCreateOpen ? "Cliente creado" : "Cliente actualizado",
                  description: "Los cambios se han guardado exitosamente.",
                });
                setIsCreateOpen(false);
                setIsEditOpen(false);
              }}>
                {isCreateOpen ? 'Crear' : 'Guardar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClientesList;