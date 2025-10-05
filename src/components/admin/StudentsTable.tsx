import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, FileDown, Filter, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PersonalityFormModal } from "./PersonalityFormModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentsTableProps {
  selectedStudentId: string | null;
  onSelectStudent: (id: string | null) => void;
}

interface Student {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  avatar?: string;
  precio?: number;
  ciclo?: string;
  promedio_general?: number;
  tasa_exito?: number;
  created_at?: string;
}

export const StudentsTable = ({ selectedStudentId, onSelectStudent }: StudentsTableProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedForAction, setSelectedForAction] = useState<string[]>([]);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStudents((data as Student[]) || []);
    } catch (error: unknown) {
      console.error("Error loading students:", error);
      toast({
        title: "Error",
        description: "Error al cargar los alumnos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedForAction.length === filteredStudents.length) {
      setSelectedForAction([]);
    } else {
      setSelectedForAction(filteredStudents.map((s) => s.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedForAction((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleExport = (format: string) => {
    toast({
      title: "Exportando",
      description: `Exportando datos en formato ${format}...`,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("students").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Alumno eliminado",
        description: "El alumno ha sido eliminado correctamente",
      });

      loadStudents();

      if (selectedStudentId === id) {
        onSelectStudent(null);
      }
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al eliminar alumno",
        variant: "destructive",
      });
    }
  };

  const handleRowClick = (student: Student) => {
    if (selectedStudentId === student.id) {
      onSelectStudent(null);
    } else {
      onSelectStudent(student.id);
    }
  };

  const openPersonalityModal = (student: Student, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentStudent(student);
    setShowPersonalityModal(true);
  };

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Alumnos Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Barra de herramientas */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar alumnos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="default">
                <Search className="h-4 w-4 mr-2" />
                BUSCAR
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  EXPORTAR
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("PDF")}>
                  Exportar PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("CSV")}>
                  Exportar CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter ?
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Filtros</h4>
                  <Button variant="ghost" className="w-full justify-start">
                    Fecha de R
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    AB - X2
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Jerarquía
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Tabla */}
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedForAction.length === filteredStudents.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Alumno</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Editar</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead>Ciclo</TableHead>
                  <TableHead>Promedio</TableHead>
                  <TableHead>Éxito</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No se encontraron alumnos
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      onClick={() => handleRowClick(student)}
                      className={`cursor-pointer transition-colors ${
                        selectedStudentId === student.id ? "bg-primary/10" : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedForAction.includes(student.id)}
                          onCheckedChange={() => toggleSelect(student.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar} alt={student.nombre} />
                            <AvatarFallback>
                              {student.nombre[0]}
                              {student.apellido[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {student.apellido}, {student.nombre}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{student.email}</TableCell>
                      <TableCell>
                        <Checkbox onClick={(e) => e.stopPropagation()} />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${student.precio?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-primary/10 rounded text-sm">
                          {student.ciclo || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>{student.promedio_general || 0}</TableCell>
                      <TableCell>{student.tasa_exito || 0}%</TableCell>
                      <TableCell className="text-right">
                        <div
                          className="flex gap-2 justify-end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => openPersonalityModal(student, e)}
                          >
                            <Sparkles className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(student.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {currentStudent && (
        <PersonalityFormModal
          isOpen={showPersonalityModal}
          onClose={() => {
            setShowPersonalityModal(false);
            setCurrentStudent(null);
          }}
          studentId={currentStudent.id}
          studentName={`${currentStudent.nombre} ${currentStudent.apellido}`}
          currentPromedio={currentStudent.promedio_general || 0}
        />
      )}
    </>
  );
};
