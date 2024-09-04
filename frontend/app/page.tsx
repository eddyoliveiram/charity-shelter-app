
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function Page() {
  return (
      <div>

        <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <Card>
              <CardHeader>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Fornecer Abrigo</h2>
                  <p className="text-muted-foreground">Ofereça abrigo temporário para vítimas de enchentes.</p>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input id="password" type="password" placeholder="Sua senha" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacidade</Label>
                      <Input id="capacity" type="number" placeholder="Número máximo de pessoas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="food">Tipo de Suporte</Label>
                      <Select id="city">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="sao-paulo">Apenas Hospedagem</SelectItem>
                            <SelectItem value="rio-de-janeiro">Hospedagem e Alimentação</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" rows={3} placeholder="Informações adicionais sobre seu abrigo" />
                  </div>
                  <Button type="submit" className="w-full">
                    Cadastrar Abrigo
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Encontrar Abrigo</h2>
                  <p className="text-muted-foreground">Encontre abrigo temporário após as enchentes.</p>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (opcional)</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input id="password" type="password" placeholder="Sua senha" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="group-size">Número de Pessoas</Label>
                      <Input id="group-size" type="number" placeholder="Número de pessoas no grupo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="food">Necessidade</Label>
                      <Select id="city">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="sao-paulo">Apenas Hospedagem</SelectItem>
                            <SelectItem value="rio-de-janeiro">Hospedagem e Alimentação</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" rows={3} placeholder="Informações adicionais sobre sua situação" />
                  </div>
                  <Button type="submit" className="w-full">
                    Encontrar Abrigo
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <Separator className="my-12" />
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Abrigos Disponíveis</h2>
              <p className="text-muted-foreground">Veja os abrigos temporários disponíveis.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card className="space-y-4">
                <CardHeader>
                  <CardTitle>Casa da Maria</CardTitle>
                  <CardDescription>Abrigo com capacidade para 4 pessoas, com alimentação disponível.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      <span>Maria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5" />
                      <span>(11) 98765-4321</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HomeIcon className="w-5 h-5" />
                      <span>Rua das Flores, 123 - Centro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-5 h-5" />
                      <span>Capacidade: 4 pessoas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtensilsIcon className="w-5 h-5" />
                      <span>Alimentação disponível</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="space-y-4">
                <CardHeader>
                  <CardTitle>Casa do João</CardTitle>
                  <CardDescription>Abrigo com capacidade para 2 pessoas, sem alimentação.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      <span>João</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5" />
                      <span>(11) 98765-4321</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HomeIcon className="w-5 h-5" />
                      <span>Rua das Árvores, 456 - Jardim</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-5 h-5" />
                      <span>Capacidade: 2 pessoas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtensilsIcon className="w-5 h-5 text-muted-foreground" />
                      <span>Sem alimentação</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="space-y-4">
                <CardHeader>
                  <CardTitle>Casa da Ana</CardTitle>
                  <CardDescription>Abrigo com capacidade para 6 pessoas, com alimentação disponível.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      <span>Ana</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5" />
                      <span>(11) 98765-4321</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HomeIcon className="w-5 h-5" />
                      <span>Rua das Nuvens, 789 - Parque</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-5 h-5" />
                      <span>Capacidade: 6 pessoas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtensilsIcon className="w-5 h-5" />
                      <span>Alimentação disponível</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
  )
}

function HomeIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
  )
}


function PhoneIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
  )
}


function UserIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
  )
}


function UsersIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
  )
}


function UtensilsIcon(props) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
  )
}
