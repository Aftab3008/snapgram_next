"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="grid w-full grow items-center px-4 sm:justify-center">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="w-full sm:w-96 border-0">
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-3 mb-2">
                      <img src="/assets/images/logo.svg" alt="logo" />
                      Create your account
                    </CardTitle>
                    <CardDescription>
                      Welcome! Please fill in the details to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        type="email"
                        className="shad-input rounded-xl p-2"
                        required
                        asChild
                      >
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-red" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        type="password"
                        className="shad-input rounded-xl p-2"
                        required
                        asChild
                      >
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-red" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          className="shad-button_primary text-center p-3 rounded-xl px-4"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                      <Button size="sm" asChild>
                        <p className="text-small-regular text-light-2 text-center mt-2">
                          Already have an account?
                          <Link
                            href="/sign-in"
                            className="text-primary-500 text-small-semibold ml-1"
                          >
                            Sign in
                          </Link>
                        </p>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="continue">
                <Card className="w-full sm:w-96 border-0">
                  <CardHeader>
                    <CardTitle>Continue registration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 w-full mb-4">
                      <Clerk.Field name="firstName" className="space-y-2">
                        <Clerk.Label>
                          <Label>Firstname</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          type="text"
                          required
                          asChild
                          className="shad-input rounded-xl p-2"
                        >
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-red" />
                      </Clerk.Field>
                      <Clerk.Field name="lastName" className="space-y-2">
                        <Clerk.Label>
                          <Label>Lastname</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          type="text"
                          required
                          asChild
                          className="shad-input rounded-xl p-2"
                        >
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-red" />
                      </Clerk.Field>
                    </div>
                    <Clerk.Field name="username" className="space-y-2">
                      <Clerk.Label>
                        <Label>Username</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        type="text"
                        required
                        asChild
                        className="shad-input rounded-xl p-2"
                      >
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-red" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          className="bg-primary-500 rounded-xl text-white text-small-semibold ml-1 hover:bg-primary-500"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="w-full sm:w-96 border-0">
                    <CardHeader>
                      <CardTitle>Verify your email</CardTitle>
                      <CardDescription>
                        Use the verification code sent to your email address
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <div className="grid items-center justify-center gap-y-2">
                        <Clerk.Field name="code" className="space-y-2">
                          <Clerk.Label className="sr-only">
                            Email address
                          </Clerk.Label>
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              className="flex justify-center has-[:disabled]:opacity-50 rounded-xl"
                              autoSubmit
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className={cn(
                                      "relative flex size-10 items-center justify-center border-y border-r border-input text-sm  text-white transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                      {
                                        "z-10 ring-2 ring-ring ring-offset-background":
                                          status === "cursor" ||
                                          status === "selected",
                                      }
                                    )}
                                  >
                                    {value}
                                    {status === "cursor" && (
                                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                        <div className="animate-caret-blink h-4 w-px bg-white duration-1000 " />
                                      </div>
                                    )}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-center text-sm text-red" />
                        </Clerk.Field>
                        <SignUp.Action
                          asChild
                          resend
                          className="text-muted-foreground"
                          fallback={({ resendableAfter }) => (
                            <Button size="sm" disabled>
                              Didn&apos;t recieve a code?{" "}
                              <span className="text-primary-500">Resend</span> (
                              <span className="tabular-nums">
                                {resendableAfter}
                              </span>
                              )
                            </Button>
                          )}
                        >
                          <Button type="button" size="sm">
                            Didn&apos;t recieve a code?{" "}
                            <span className="text-primary-500">Resend</span>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="bg-primary-500 rounded-xl text-white text-small-semibold ml-1 hover:bg-primary-500"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Loader className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
