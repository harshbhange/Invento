import { getCompanyDetails } from "@/api/company"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { loggedInUserAtom } from "@/context/atoms"
import { useApi } from "@/hooks/call-api-hook"
import type { Company } from "@/types"
import { useRecoilValue } from "@swarmica/recoil"
import {
  MdBusiness,
  MdCalendarMonth,
  MdEdit,
  MdLabel,
  MdPeople,
  MdPerson,
  MdAdminPanelSettings,
  MdWorkspacePremium,
} from "react-icons/md"
import { Link } from "react-router"

type CompanyMember = {
  id: string
  userName: string
  email: string
}

type GetCompanyDetailsType = {
  company: Company
  members: {
    admins: CompanyMember[]
    employees: CompanyMember[]
    owner: CompanyMember | null
  }
}

const CompanyProfile = () => {
  const user = useRecoilValue(loggedInUserAtom)

  const { data, loading } = useApi<GetCompanyDetailsType>(getCompanyDetails)

  const company = data?.company
  const members = data?.members

  const role = user?.companyMembers?.[0]?.role
  const canViewAllMembers = role === "OWNER" || role === "ADMIN"

  if (loading) {
    return (
      <Card className="mx-auto w-full max-w-5xl overflow-hidden">
        <div className="h-2 animate-pulse bg-muted" />

        <CardHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-14 animate-pulse rounded-xl bg-muted" />

            <div className="flex-1 space-y-2">
              <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="h-16 animate-pulse rounded-lg bg-muted" />
        </CardHeader>

        <CardContent>
          <div className="h-32 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    )
  }

  if (!company) {
    return (
      <Card className="mx-auto w-full max-w-5xl">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <MdBusiness className="size-10 text-muted-foreground" />

          <h2 className="text-lg font-semibold">Company details unavailable</h2>

          <p className="text-sm text-muted-foreground">
            We couldn't load your company information.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Find the logged-in employee's own record.
  const currentEmployee = members?.employees?.find(
    (employee) => employee.email === user?.email
  )

  // Owners and admins can see all groups.
  // Employees can see only their own employee record.
  const memberGroups = canViewAllMembers
    ? [
        {
          title: "Owners",
          people: members?.owner ? [members.owner] : [],
          icon: MdWorkspacePremium,
          description: "Company ownership",
        },
        {
          title: "Administrators",
          people: members?.admins ?? [],
          icon: MdAdminPanelSettings,
          description: "Manage company operations",
        },
        {
          title: "Employees",
          people: members?.employees ?? [],
          icon: MdPeople,
          description: "Company team members",
        },
      ]
    : [
        {
          title: "Employees",
          people: currentEmployee ? [currentEmployee] : [],
          icon: MdPeople,
          description: "Your employee profile",
        },
      ]

  const totalMembers = memberGroups.reduce(
    (total, group) => total + group.people.length,
    0
  )

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Company profile */}
      <Card className="overflow-hidden border-border/70 shadow-sm">
        <div className="h-2 bg-primary" />

        <CardHeader className="gap-5 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
                <MdBusiness className="size-7 text-primary" />
              </div>

              <div className="min-w-0 space-y-1">
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Company profile
                </p>

                <CardTitle className="text-2xl tracking-tight wrap-break-word">
                  {company.name}
                </CardTitle>

                <CardDescription>
                  Company information and details
                </CardDescription>
              </div>
            </div>

            {canViewAllMembers && (
              <Button asChild variant="outline" className="shrink-0">
                <Link to="/auth/company/update">
                  <MdEdit className="mr-2 size-5" />
                  Edit company
                </Link>
              </Button>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">About the company</h3>

            <p className="text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
              {company.description ||
                "No company description has been added yet."}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-7 sm:px-8">
          <Separator />

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MdLabel className="size-5 text-muted-foreground" />

              <h3 className="text-sm font-semibold">Company tags</h3>

              <Badge variant="secondary">{company.tags.length}</Badge>
            </div>

            {company.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    variant="secondary"
                    className="rounded-md px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tags have been added yet.
              </p>
            )}
          </div>

          <Separator />

          {/* Created date */}
          <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MdCalendarMonth className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Created on</p>

              <p className="text-sm font-medium">
                {company.createdAt
                  ? new Date(company.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Not available"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company members */}
      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MdPeople className="size-6 text-primary" />
                {canViewAllMembers ? "Company members" : "Your membership"}
              </CardTitle>

              <CardDescription className="mt-1">
                {canViewAllMembers
                  ? "People and roles within your company"
                  : "Your employee information"}
              </CardDescription>
            </div>

            <Badge variant="secondary" className="w-fit px-3 py-1">
              {totalMembers} {totalMembers === 1 ? "member" : "members"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Member counts: only owners and admins */}
          {canViewAllMembers && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                {memberGroups.map((group) => {
                  const Icon = group.icon

                  return (
                    <div
                      key={group.title}
                      className="rounded-xl border bg-muted/20 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-background shadow-sm">
                          <Icon className="size-5 text-primary" />
                        </div>

                        <span className="text-2xl font-semibold tabular-nums">
                          {group.people.length}
                        </span>
                      </div>

                      <p className="mt-3 font-medium">{group.title}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                  )
                })}
              </div>

              <Separator />
            </>
          )}

          {/* Member lists */}
          <div className="space-y-6">
            {memberGroups.map((group) => {
              const Icon = group.icon

              return (
                <section key={group.title} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                      <Icon className="size-5 text-muted-foreground" />
                      {group.title}
                    </h3>

                    <Badge variant="outline">{group.people.length}</Badge>
                  </div>

                  {group.people.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {group.people.map((person) => (
                        <div
                          key={person.id}
                          className="flex min-w-0 items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/40"
                        >
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <MdPerson className="size-6" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {person.userName || "Unnamed member"}
                            </p>

                            {person.email && (
                              <p className="truncate text-xs text-muted-foreground">
                                {person.email}
                              </p>
                            )}

                            {!canViewAllMembers && (
                              <Badge variant="secondary" className="mt-1">
                                Employee
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg border border-dashed px-4 py-5 text-center text-sm text-muted-foreground">
                      {canViewAllMembers
                        ? `No ${group.title.toLowerCase()} found.`
                        : "Your employee record wasn't found in the company members response."}
                    </p>
                  )}
                </section>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CompanyProfile
