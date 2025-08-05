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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Shield,
  User,
  Calendar
} from 'lucide-react';
import { mockUsuarios, mockClientes, mockCargos } from '@/data/mockData';
import { Usuario } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<string>('todos');
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = 
      usuario.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.login.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCliente = selectedCliente === 'todos' || 
      usuario.cliente_ID.toString() === selectedCliente;
    
    return matchesSearch && matchesCliente;
  });

  const getClienteName = (clienteId: number) => {
    const cliente = mockClientes.find(c => c.id === clienteId);
    return cliente?.nombre || 'Cliente no encontrado';
  };

  const getCargoName = (cargoId: number) => {
    const cargo = mockCargos.find(c => c.id === cargoId);
    return cargo?.nombre || 'Cargo no encontrado';
  };

  const handleDelete = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado exitosamente.",
    });
  };

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsEditOpen(true);
  };

  const handleCreate = () => {
    setSelectedUsuario(null);
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
              Administración de Usuarios
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Gestiona usuarios por cliente
            </p>
          </div>
          <Button onClick={handleCreate} className="bg-primary hover:bg-primary-hover">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios por nombre o login..."
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
              <SelectItem value="todos">Todos los clientes</SelectItem>
              {mockClientes.map((cliente) => (
                <SelectItem key={cliente.id} value={cliente.id.toString()}>
                  {cliente.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">
                {filteredUsuarios.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Usuarios</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-success">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {filteredUsuarios.filter(u => u.esActivo).length}
              </div>
              <p className="text-sm text-muted-foreground">Activos</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-warning">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">
                {filteredUsuarios.filter(u => u.isAdmin).length}
              </div>
              <p className="text-sm text-muted-foreground">Administradores</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-accent">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent-foreground">
                {filteredUsuarios.filter(u => u.allRubros).length}
              </div>
              <p className="text-sm text-muted-foreground">Con Todos Rubros</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Permisos</TableHead>
                <TableHead>Última Actualización</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {usuario.nombres} {usuario.apellidos}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @{usuario.login}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getClienteName(usuario.cliente_ID)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getCargoName(usuario.cargo_ID)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={usuario.esActivo ? "default" : "destructive"}
                      className={usuario.esActivo ? "bg-success" : ""}
                    >
                      {usuario.esActivo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {usuario.isAdmin && (
                        <Badge variant="default" className="bg-warning text-warning-foreground w-fit">
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                      {usuario.allRubros && (
                        <Badge variant="default" className="bg-primary w-fit">
                          Todos Rubros
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(usuario.fechaHorActualizacion)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(usuario)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(usuario.id)}
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

        {filteredUsuarios.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No se encontraron usuarios.</p>
          </div>
        )}
      </CardContent>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setSelectedUsuario(null);
        }
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isCreateOpen ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input
                  id="nombres"
                  placeholder="Nombres"
                  defaultValue={selectedUsuario?.nombres || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  placeholder="Apellidos"
                  defaultValue={selectedUsuario?.apellidos || ''}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                placeholder="nombre.usuario"
                defaultValue={selectedUsuario?.login || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Select defaultValue={selectedUsuario?.cliente_ID?.toString() || ''}>
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
              <Label htmlFor="cargo">Cargo</Label>
              <Select defaultValue={selectedUsuario?.cargo_ID?.toString() || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cargo" />
                </SelectTrigger>
                <SelectContent>
                  {mockCargos.map((cargo) => (
                    <SelectItem key={cargo.id} value={cargo.id.toString()}>
                      {cargo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="activo"
                defaultChecked={selectedUsuario?.esActivo ?? true}
              />
              <Label htmlFor="activo">Usuario Activo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="admin"
                defaultChecked={selectedUsuario?.isAdmin ?? false}
              />
              <Label htmlFor="admin">Es Administrador</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allrubros"
                defaultChecked={selectedUsuario?.allRubros ?? false}
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
                  title: isCreateOpen ? "Usuario creado" : "Usuario actualizado",
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

export default UsuariosList;