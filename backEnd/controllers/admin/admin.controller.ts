import { Request, Response } from "express";
import prisma from "../../db/Db-context";
import { uploadImageToS3 } from "../../utils/uploadToS3.util";
import { sendMail } from "../../utils/email.util";

export const addUser = async (req: any, res: Response) => {
  const { Fname, Mname, Lname, State, Area, Flate, City, Pin, Email, Initiation } = req.body;
  const file = req.files.image;

  try {
    const FindeUser = await prisma.devotee.findFirst({ where: { email: Email } });
    if (FindeUser != null) {
      res.status(202).send("Email Alredy exist");
    } else {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString().slice(-2);
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const initials = Fname.slice(0, 2) + Lname.slice(0, 2);
      const dynamicID = `${year}-${initials}-${month}`;

      const photoUrl = await uploadImageToS3(file.data, file.name);

      const Data = await prisma.devotee.create({
        data: {
          address: Flate + "," + Area + "," + City + "," + State + "," + Pin,
          area: Area,
          city: City,
          state: State,
          pinCode: Pin,
          flatNumber: Flate,
          userID: dynamicID,
          firstName: Fname,
          middleName: Mname,
          lastName: Lname,
          initiationDate: Initiation,
          email: Email,
          password: Math.floor(Math.random() * 1000000).toString(),
          photoURL: photoUrl,
        },
      });

      const Body = `Hi, Your Login Credentials are Email : ${Data.email} And Password ${Data.password}`;

      sendMail(Body, Data.email);
      res.status(200).send("User Created");
    }
  } catch (error) {
    console.log(error);
    res.status(201).send("something went wrong !");
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const Data = await prisma.devotee.findMany({
      select: {
        photoURL: true,
        address: true,
        email: true,
        id: true,
        firstName: true,
        initiationDate: true,
        payments: { include: { devotee: true } },
      },
    });
    res.send(Data);
  } catch (error) {
    res.send(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const users = await prisma.devotee.findUnique({ where: { id: id } });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const UpdateUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, middleName, lastName, photoURL, address, flatNumber, area, state, city, pinCode, email, devoteeId, password, initiationDate } = req.body;
    const file = req.files?.image;
    const lastuserData = await prisma.devotee.findUnique({ where: { id: parseInt(id) } });

    let photoUrl: any;
    if (file) {
      photoUrl = await uploadImageToS3(file.data, file.name);
    } else {
      photoUrl = lastuserData?.photoURL;
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const initials = firstName.slice(0, 2) + lastName.slice(0, 2);
    const dynamicID = `${year}-${initials}-${month}`;

    const Data = await prisma.devotee.update({
      where: { id: parseInt(id) },
      data: {
        address: flatNumber + "," + area + "," + city + "," + state + "," + pinCode,
        area,
        city,
        state,
        pinCode,
        flatNumber,
        userID: dynamicID,
        firstName,
        middleName,
        lastName,
        initiationDate: initiationDate,
        email,
        password: Math.floor(Math.random() * 1000000).toString(),
        photoURL: photoUrl,
      },
    });

    const Body = `Hi, Your Profile is Updated by Admin.Your Login Credentials are Email : ${Data.email} And Password ${Data.password}`;
    sendMail(Body, Data.email);
    res.status(200).send("User updated");
  } catch (error) {
    console.log(error);
    res.status(404).send("something went wrong !");
  }
};
